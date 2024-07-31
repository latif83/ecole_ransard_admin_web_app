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