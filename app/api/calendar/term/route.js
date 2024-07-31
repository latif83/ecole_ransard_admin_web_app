import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { termName, startDate, endDate, academicYearId } = await req.json();

    if (!termName || !startDate || !endDate || !academicYearId) {
      return NextResponse.json(
        {
          error:
            "termName, startDate, endDate, and academicYearId are required",
        },
        { status: 400 }
      );
    }

    // Check if the academic year exists
    const academicYear = await prisma.academicYear.findUnique({
      where: { id: academicYearId },
    });

    if (!academicYear) {
      return NextResponse.json(
        { error: "Academic Year not found" },
        { status: 404 }
      );
    }

    // Check for existing active or pending academic terms for the associated academic year
    const activeAcademicTerm = await prisma.academicTerm.findFirst({
      where: {
        academicYearId,
        status: "Active",
      },
    });

    const pendingAcademicTerm = await prisma.academicTerm.findFirst({
      where: {
        academicYearId,
        status: "Pending",
      },
    });

    let newStatus;

    // Determine the status of the new academic term
    if (activeAcademicTerm) {
      // If there is an active academic term, set the new one as pending
      newStatus = "Pending";
    } else if (pendingAcademicTerm) {
      // If there is a pending academic term, throw an error
      return NextResponse.json(
        { error: "There is a pending academic term for this academic year." },
        { status: 400 }
      );
    } else {
      // If no active or pending academic term exists, determine if it should be active or pending
      const today = new Date();
      const start = new Date(startDate);
      newStatus = start <= today ? "Active" : "Pending";
    }

    // Create the new academic term with the determined status
    const newAcademicTerm = await prisma.academicTerm.create({
      data: {
        termName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: newStatus,
        academicYearId,
      },
    });

    return NextResponse.json(
      { message: "Academic Term created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating academic term:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
