import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { year, startDate, endDate } = await req.json();

    if (!year || !startDate || !endDate) {
      return NextResponse.json(
        { error: "year, startDate, and endDate are required" },
        { status: 400 }
      );
    }

    // Check for existing active or pending academic years
    const activeAcademicYear = await prisma.academicYear.findFirst({
      where: { status: "Active" },
    });

    const pendingAcademicYear = await prisma.academicYear.findFirst({
      where: { status: "Pending" },
    });

    let newStatus;

    // Determine the status of the new academic year
    if (activeAcademicYear) {
      // If there is an active academic year, set the new one as pending
      newStatus = "Pending";
    } else if (pendingAcademicYear) {
      // If there is a pending academic year, throw an error
      return NextResponse.json(
        { error: "There is a pending academic year." },
        { status: 400 }
      );
    } else {
      // If no active or pending academic year exists, determine if it should be active or pending
      const today = new Date();
      const start = new Date(startDate);
      newStatus = start <= today ? "Active" : "Pending";
    }

    // Create the new academic year with the determined status
    const newAcademicYear = await prisma.academicYear.create({
      data: {
        year,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: newStatus,
      },
    });

    return NextResponse.json(
      { message: "Academic Year Created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating academic year:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
