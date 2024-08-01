import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { yearId: academicYearId } = params;

    if (!academicYearId) {
      return NextResponse.json(
        { error: "academicYearId is required" },
        { status: 400 }
      );
    }

    // Fetch the academic year and its associated terms
    const academicYear = await prisma.academicYear.findUnique({
      where: { id: academicYearId },
      include: {
        terms: {
          orderBy: {
            startDate: 'asc', // Order terms by start date, adjust as needed
          },
        },
      },
    });

    if (!academicYear) {
      return NextResponse.json(
        { error: "Academic Year not found" },
        { status: 404 }
      );
    }

    // Return the academic year details along with the academic terms
    return NextResponse.json({ academicYear }, { status: 200 });
  } catch (error) {
    console.error("Error fetching academic year and terms:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req,{params}) {
  try {

    const {yearId:id} = params

    const { year, startDate, endDate } = await req.json();

    if (!year || !startDate || !endDate) {
      return NextResponse.json(
        { error: "id, year, startDate, and endDate are required" },
        { status: 400 }
      );
    }

    // Find the existing academic year
    const existingAcademicYear = await prisma.academicYear.findUnique({
      where: { id },
    });

    if (!existingAcademicYear) {
      return NextResponse.json(
        { error: "Academic Year not found" },
        { status: 404 }
      );
    }

    // Check if the existing academic year is inactive
    if (existingAcademicYear.status === "Inactive") {
      return NextResponse.json(
        { error: "Inactive academic years cannot be updated" },
        { status: 400 }
      );
    }

    // Proceed with updating the academic year
    const updatedAcademicYear = await prisma.academicYear.update({
      where: { id },
      data: {
        year,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(
      { message: "Academic Year Updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating academic year:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
