import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { subjectId, classSectionId } = params;

    if (!subjectId || !classSectionId) {
      return NextResponse.json(
        { message: "Subject ID and Class Section ID are required" },
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
            assessment: {
              subjectId,
            },
          },
        },
      },
    });

    const assessments = await prisma.Assessments.findMany({
      where: {
        subjectId,
        classSessionId: classSectionId,
      }
    });

    const subject = await prisma.Subjects.findUnique({
      where : {
        id : subjectId
      }
    })

    const gradeSettings = await prisma.GradeSetting.findMany();

    const formattedResponse = students.map((student) => {
      const grades = student.Grades;
      const studentName = `${student.firstName} ${student.lastName}`;
      const studentId = student.id;
      const scores = grades.map((grade) => {
        const assessment = assessments.find((a) => a.id === grade.assessmentId);
        const score = grade.score;
        const weight = assessment.weight;
        const marks = assessment.marks;
        return {
          assessmentName: assessment.name,
          score,
          weight: (score / marks) * weight,
        };
      });

      const totalScore = scores.reduce((acc, curr) => acc + curr.weight, 0);

      let remarks = "N/A";
      let grade = "N/A";

      for (const setting of gradeSettings) {
        if ((totalScore >= setting.minScore) && (totalScore <= setting.maxScore)) {
          remarks = setting.comment;
          grade = setting.grade;
          break;
        }
      }

      return {
        studentId,
        studentName,
        scores,
        totalScore,
        grade,
        remarks,
      };
    });

    return NextResponse.json({subject:subject.name,students:formattedResponse}, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
