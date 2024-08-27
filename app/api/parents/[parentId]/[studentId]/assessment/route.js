import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';


export async function GET(req, { params }) {
  const { parentId, studentId } = params;

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

    console.log(student)

    if (!student) {
      return NextResponse.json({ message: 'Student not found or not associated with the parent' }, { status: 404 });
    }

    // Process each subject and assessments to calculate the total score
    const subjects = {};
    student.grades.forEach((grade) => {
      const subjectName = grade.assessment.subject.name;
      const weight = grade.assessment.weight || 0;
      const score = grade.score || 0;

      if (!subjects[subjectName]) {
        subjects[subjectName] = { totalWeight: 0, totalScore: 0, grades: [] };
      }

      subjects[subjectName].totalWeight += weight;
      subjects[subjectName].totalScore += (weight * score) / 100;
      subjects[subjectName].grades.push({
        score: grade.score,
        assessment: grade.assessment.name,
        academicTerm: grade.assessment.academicTerm.termName,
      });
    });

    // Match the total score with the GradeSetting model for each subject
    const results = await Promise.all(
      Object.keys(subjects).map(async (subjectName) => {
        const { totalScore } = subjects[subjectName];

        const gradeSetting = await prisma.gradeSetting.findFirst({
          where: {
            minScore: { lte: totalScore },
            maxScore: { gte: totalScore },
          },
        });

        return {
          subject: subjectName,
          totalScore,
          grade: gradeSetting?.grade || 'N/A',
          remarks: gradeSetting?.comment || 'No remarks',
          details: subjects[subjectName].grades,
        };
      })
    );

    return NextResponse.json({ student: `${student.firstName} ${student.lastName}`, results });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching results', error }, { status: 500 });
  }
}