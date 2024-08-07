import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const classSectionId = searchParams.get('classSectionId');

    // Get current academic term
    const currentAcademicTerm = await prisma.AcademicTerm.findFirst({
      where: { status: "Active" },
    });

    const currentAcademicTermId = currentAcademicTerm.id;

    // Get inactive academic terms
    const inactiveTerms = await prisma.AcademicTerm.findMany({
      where: { status: "Inactive" },
    });

    const inactiveTermIds = inactiveTerms.map((term) => term.id);

    // Get all students from the specified class section
    const allStudents = await prisma.Students.findMany({
      where: {
        classSectionsId: classSectionId, // Filter by class section ID
      },
    });

    // Initialize student data with default values
    const studentData = allStudents.reduce((acc, student) => {
      acc[student.id] = {
        previousOwed: 0,
        currentBill: 0,
        totalAmountPayable: 0,
        student,
      };
      return acc;
    }, {});

    // Get students' previous owed amounts and payments
    const previousOwed = await prisma.StudentFeeSummary.findMany({
      where: {
        academicTermId: { in: inactiveTermIds },
        studentId: { in: allStudents.map((student) => student.id) }, // Filter by student IDs
      },
      include: {
        student: true,
      },
    });

    // Calculate total owed and total paid for previous terms
    previousOwed.forEach((summary) => {
      const studentId = summary.studentId;
      if (studentData[studentId]) {
        studentData[studentId].previousOwed += summary.totalAmountOwed - summary.totalAmountPaid;
      }
    });

    // Get current bills
    const currentBills = await prisma.StudentFeeSummary.findMany({
      where: {
        academicTermId: currentAcademicTermId,
        studentId: { in: allStudents.map((student) => student.id) }, // Filter by student IDs
      },
      include: {
        student: true,
      },
    });

    // Calculate total current bills
    currentBills.forEach((summary) => {
      const studentId = summary.studentId;
      if (studentData[studentId]) {
        studentData[studentId].currentBill += summary.totalAmountOwed - summary.totalAmountPaid;
      }
    });

    // Calculate total amount payable
    for (const studentId in studentData) {
      const studentInfo = studentData[studentId];
      studentInfo.totalAmountPayable = studentInfo.previousOwed + studentInfo.currentBill;
    }

    const classWithSection = await prisma.Classes.findFirst({
      where: {
        ClassSections: {
          some: { id: classSectionId }
        }
      },
      include: {
        ClassSections: {
          where: {
            id: classSectionId
          }
        }
      }
    });

    // Return the formatted response
    return NextResponse.json(
      {className : `${classWithSection.className} (${classWithSection.ClassSections[0].sectionName})` , data:Object.values(studentData)},
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching student billing information:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
