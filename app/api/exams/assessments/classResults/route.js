import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const termId = searchParams.get("termId");
    const sectionId = searchParams.get("sectionId");

    if (!termId || !sectionId) {
      return NextResponse.json(
        { error: "Missing required termId or sectionId." },
        { status: 400 }
      );
    }

    // Get all students in the class section for the given term
    const students = await prisma.students.findMany({
      where: {
        classSectionsId: sectionId,
      },
      include: {
        Grades: {
          where: {
            academicTermId: termId,
          },
          include: {
            assessment: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
    });

    if (students.length === 0) {
      return NextResponse.json(
        { error: "No students found for this class section." },
        { status: 404 }
      );
    }

    // Initialize an object to store total weighted scores for each student per subject
    const subjectStats = {};

    // Process the student grades to calculate total weighted scores per subject per student
    students.forEach((student) => {
      const studentSubjectScores = {}; // Track total weighted score per subject for the current student

      student.Grades.forEach((grade) => {
        const subjectName = grade.assessment.subject.name;
        const score = grade.score;
        const maxMarks = grade.assessment.marks;
        const weight = grade.assessment.weight;

        // Calculate the weighted score for this particular grade
        const weightedScore = (score / maxMarks) * weight;

        // Accumulate the weighted score for the current subject for the student
        if (!studentSubjectScores[subjectName]) {
          studentSubjectScores[subjectName] = 0;
        }
        studentSubjectScores[subjectName] += weightedScore;
      });

      // Update subject stats with the student's total weighted score for each subject
      Object.keys(studentSubjectScores).forEach((subjectName) => {
        const studentTotalWeightedScore = studentSubjectScores[subjectName];

        if (!subjectStats[subjectName]) {
          subjectStats[subjectName] = {
            subjectName,
            highestScore: studentTotalWeightedScore,
            lowestScore: studentTotalWeightedScore,
            totalScore: studentTotalWeightedScore,
            bestStudent: student.firstName + " " + student.lastName
          };
        } else {
          // Update the total score
          subjectStats[subjectName].totalScore += studentTotalWeightedScore;

          // Check for the highest score
          if (studentTotalWeightedScore > subjectStats[subjectName].highestScore) {
            subjectStats[subjectName].highestScore = studentTotalWeightedScore;
            subjectStats[subjectName].bestStudent =
              student.firstName + " " + student.lastName;
          }

          // Check for the lowest score
          if (studentTotalWeightedScore < subjectStats[subjectName].lowestScore) {
            subjectStats[subjectName].lowestScore = studentTotalWeightedScore;
          }
        }
      });
    });

    // Convert subjectStats object into an array
    const subjectStatsArray = Object.values(subjectStats).map(stat => {
      stat.averageScore = stat.totalScore / students.length;
      return stat;
    });

    return NextResponse.json(
      {
        data: subjectStatsArray,
        totalStudents: students.length,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
