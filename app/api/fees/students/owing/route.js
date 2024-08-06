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

    if (!currentAcademicTerm) {
      return NextResponse.json(
        { error: "No active academic term found" },
        { status: 404 }
      );
    }

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

    // Get students' previous owed amounts
    const previousOwed = await prisma.StudentFeeSummary.findMany({
      where: {
        academicTermId: { in: inactiveTermIds },
        studentId: { in: allStudents.map((student) => student.id) }, // Filter by student IDs
      },
      include: {
        student: true,
      },
    });

    // Calculate total owed for previous terms
    previousOwed.forEach((summary) => {
      const studentId = summary.studentId;
      if (studentData[studentId]) {
        studentData[studentId].previousOwed += summary.totalAmountOwed;
      }
    });

    // Get current bills
    const currentBills = await prisma.StudentFeeDetail.findMany({
      where: {
        academicTermId: currentAcademicTermId,
        studentId: { in: allStudents.map((student) => student.id) }, // Filter by student IDs
      },
      include: {
        student: true,
      },
    });

    // Calculate total current bills
    currentBills.forEach((bill) => {
      const studentId = bill.studentId;
      if (studentData[studentId]) {
        studentData[studentId].currentBill += bill.amount;
      }
    });

    // Calculate total amount payable
    for (const studentId in studentData) {
      const studentInfo = studentData[studentId];
      studentInfo.totalAmountPayable = studentInfo.previousOwed + studentInfo.currentBill;
    }

    // Return the formatted response
    return NextResponse.json(
      Object.values(studentData),
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
