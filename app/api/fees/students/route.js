import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const classSectionId = searchParams.get("classSectionId");
    const academicTermId = searchParams.get("academicTermId");

    // Validate required fields
    if (!classSectionId || !academicTermId) {
      return NextResponse.json(
        { error: "classSectionId and academicTermId are required" },
        { status: 400 }
      );
    }

    // Fetch students for the given class section
    const students = await prisma.Students.findMany({
      where: { classSectionsId: classSectionId },
      include: {
        // Include student-related billing details for the current academic term
        StudentFeeDetail: {
          where: {
            academicTermId: academicTermId,
          },
          include: {
            feeDetail: true,
          },
        },
      },
    });

    const classSection = await prisma.ClassSections.findUnique({
      where: { id: classSectionId },
      include: {
        class: true,
      },
    });

    const academicTerm = await prisma.AcademicTerm.findUnique({
      where: { id: academicTermId },
      include: {
        academicYear: true,
      },
    });

    // Format response to include billing details
    const result = students.map((student) => ({
      studentId: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      feeDetails: student.StudentFeeDetail.map((feeDetail) => ({
        feeTitle: feeDetail.feeDetail.title,
        feeAmount: feeDetail.amount,
      })),
    }));

    return NextResponse.json({
      class: `${classSection.class.className} (${classSection.sectionName})`,
      academicTerm: academicTerm.termName,
      academicYear: academicTerm.academicYear.year,
      students: result,
    });
  } catch (error) {
    console.error("Error fetching students and billing details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
