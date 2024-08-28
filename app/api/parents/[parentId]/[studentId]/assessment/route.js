import { NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function GET(req, { params }) {
  const { parentId, studentId } = params;

  // Parse query parameters
  const { searchParams } = new URL(req.url);
  const academicTermId = searchParams.get("academicTermId");

  try {
    // Check if the parent is associated with the student
    const student = await prisma.students.findFirst({
      where: {
        id: studentId,
        parentId: parentId, // Ensure that the parent has access to this student
      },
      include: {
        class: true,
        Grades: {
          where : {
            academicTermId
          },
          include: {
            assessment: {
              include: {
                subject: true,
                academicTerm: true,
              },
            },
          },
        },
      },
    });

    // console.log(student)

    if (!student) {
      return NextResponse.json(
        { message: "Student not found or not associated with the parent" },
        { status: 404 }
      );
    }

    // Process each subject and assessments to calculate the total score
    const subjects = {};

    student.Grades.forEach((grade) => {
      const subjectName = grade.assessment.subject.name;

      const subjectId = grade.assessment.subject.id;

      const assessmentWeight = grade.assessment.weight || 0;
      const assessmentScore = grade.assessment.marks || 0;

      const score = grade.score || 0;

      if (!subjects[subjectName]) {
        subjects[subjectName] = { marks: 0 };
      }

      subjects[subjectName].marks +=
        (assessmentWeight * score) / assessmentScore;

      // subjects[subjectName].grades.push({
      //   score: grade.score,
      //   assessment: grade.assessment.name,
      //   academicTerm: grade.assessment.academicTerm.termName,
      // });
    });

    // Match the total score with the GradeSetting model for each subject
    const results = await Promise.all(
      Object.keys(subjects).map(async (subjectName) => {
        const { marks } = subjects[subjectName];

        const gradeSetting = await prisma.gradeSetting.findFirst({
          where: {
            minScore: { lte: marks },
            maxScore: { gte: marks },
          },
        });

        return {
          subject: subjectName,
          marks,
          grade: gradeSetting?.grade || "N/A",
          remarks: gradeSetting?.comment || "N/A",
        };
      })
    );

    return NextResponse.json(results,{status:200});
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching results", error },
      { status: 500 }
    );
  }
}
