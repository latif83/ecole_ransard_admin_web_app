import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req, { params }) {
    try {
      const { termId: academicTermId } = params;
  
      if (!academicTermId) {
        return NextResponse.json(
          { error: "academicTermId is required" },
          { status: 400 }
        );
      }
  
      // Check if the academic term exists
      const academicTerm = await prisma.academicTerm.findUnique({
        where: { id: academicTermId },
        include: { academicYear: true }, // Include the associated academic year
      });
  
      if (!academicTerm) {
        return NextResponse.json(
          { error: "Academic Term not found" },
          { status: 404 }
        );
      }
  
      // Check if the academic term is pending
      if (academicTerm.status !== "Pending") {
        return NextResponse.json(
          { error: "The academic term is not in pending status." },
          { status: 400 }
        );
      }
  
      // Check if the associated academic year is active
      if (academicTerm.academicYear.status !== "Active") {
        return NextResponse.json(
          { error: "The academic year is not active." },
          { status: 400 }
        );
      }
  
      // Check if there is already an active academic term for the same academic year
      const activeAcademicTerm = await prisma.academicTerm.findFirst({
        where: {
          academicYearId: academicTerm.academicYearId,
          status: "Active",
        },
      });
  
      if (activeAcademicTerm) {
        return NextResponse.json(
          {
            error:
              "There is already an active academic term for this academic year.",
          },
          { status: 400 }
        );
      }
  
      // Activate the academic term
      const updatedAcademicTerm = await prisma.academicTerm.update({
        where: { id: academicTermId },
        data: {
          status: "Active",
          startDate: new Date(), // Optional: Set startDate to today or keep the existing date
        },
      });
  
      return NextResponse.json(
        { message: "Academic Term activated successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error activating academic term:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }  