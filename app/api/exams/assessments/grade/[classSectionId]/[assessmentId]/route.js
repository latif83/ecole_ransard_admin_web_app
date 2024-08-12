import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { classSectionId, assessmentId } = params;

    if (!classSectionId) {
      return NextResponse.json(
        { message: "Class section ID is required" },
        { status: 400 }
      );
    }

    const students = await prisma.Students.findMany({
      where: {
        classSectionsId: classSectionId,
      },
      include: {
        Grades: {
          where: {
            assessmentId,
          },
        },
      },
    });

    const assessment = await prisma.Assessments.findUnique({
      where: {
        id: assessmentId,
      },
      include: {
        subject: true,
      },
    });

    const formattedResponse = students.map((student) => {
      const grade = student.Grades[0];
      const studentName = `${student.firstName} ${student.lastName}`;
      const studentId= student.id
      const score = grade?.score ? grade?.score : "N/A";
      const weight =
        score != "N/A" ? ((score / assessment.marks) * assessment.weight).toFixed(2) : "N/A";

      return {
        studentId,
        studentName,
        score,
        weight,
      };
    });

    const response = {
      subject: assessment.subject.name,
      assessment: assessment.name,
      marks: assessment.marks,
      weight: assessment.weight,
      students: formattedResponse,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    let { score, studentId } = await req.json();

    score = parseFloat(score)

    const { assessmentId } = params;

    if (!assessmentId || !studentId) {
      return NextResponse.json({ message: "Assessment ID and student ID are required" }, { status: 400 });
    }

    if (!score) {
      return NextResponse.json({ message: "Score is required" }, { status: 400 });
    }

    const assessment = await prisma.Assessments.findUnique({
      where: {
        id: assessmentId,
      },
    });

    if (!assessment) {
      return NextResponse.json({ message: "Assessment not found" }, { status: 404 });
    }

    if (score > assessment.marks) {
      return NextResponse.json({ message: "Score cannot be greater than the assessment's total marks" }, { status: 400 });
    }

    const existingGrade = await prisma.Grades.findFirst({
      where: {
        assessmentId,
        studentId,
      },
    });

    if (existingGrade) {
      await prisma.Grades.update({
        where: {
          id: existingGrade.id,
        },
        data: {
          score,
        },
      });
    } else {
      await prisma.Grades.create({
        data: {
          assessmentId,
          studentId,
          score,
        },
      });
    }

    return NextResponse.json({ message: "Student scored successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error scoring student:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}