import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { termId: academicTermId } = params;

    if (!academicTermId) {
      return NextResponse.json(
        { error: "academicTermId is required" },
        { status: 400 }
      );
    }

    // Fetch the academic term with its related events
    const academicTerm = await prisma.academicTerm.findUnique({
      where: { id: academicTermId },
      include: {
        events: true, // Include events related to the academic term
      },
    });

    if (!academicTerm) {
      return NextResponse.json(
        { error: "Academic Term not found" },
        { status: 404 }
      );
    }

    // Return the academic term along with its events
    return NextResponse.json({ academicTerm }, { status: 200 });
  } catch (error) {
    console.error("Error fetching academic term events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PUT(req,{params}) {
    try {
        const {termId:id} = params
      const { termName, startDate, endDate } = await req.json();
  
      if (!termName || !startDate || !endDate) {
        return NextResponse.json(
          {
            error: "id, termName, startDate, and endDate are required",
          },
          { status: 400 }
        );
      }
  
      // Find the existing academic term
      const existingAcademicTerm = await prisma.academicTerm.findUnique({
        where: { id },
      });
  
      if (!existingAcademicTerm) {
        return NextResponse.json(
          { error: "Academic Term not found" },
          { status: 404 }
        );
      }
  
      // Check if the academic year associated with the term exists
      const academicYear = await prisma.academicYear.findUnique({
        where: { id: existingAcademicTerm.academicYearId },
      });
  
      if (!academicYear) {
        return NextResponse.json(
          { error: "Associated Academic Year not found" },
          { status: 404 }
        );
      }

      // Check if the existing academic year is inactive
    if (existingAcademicTerm.status === "Inactive") {
        return NextResponse.json(
          { error: "Inactive academic terms cannot be updated" },
          { status: 400 }
        );
      }
  
      // Update the academic term with the new data and status
      const updatedAcademicTerm = await prisma.academicTerm.update({
        where: { id },
        data: {
          termName,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
  
      return NextResponse.json(
        { message: "Academic Term updated successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating academic term:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(req, { params }) {
    try {
      const { termId: academicTermId } = params;
  
      if (!academicTermId) {
        return NextResponse.json(
          { error: "academicTermId is required" },
          { status: 400 }
        );
      }
  
      // Find the existing academic term
      const academicTerm = await prisma.academicTerm.findUnique({
        where: { id: academicTermId },
      });
  
      if (!academicTerm) {
        return NextResponse.json(
          { error: "Academic Term not found" },
          { status: 404 }
        );
      }
  
      // Check if the academic term is active
      if (academicTerm.status !== "Active") {
        return NextResponse.json(
          { error: "Only active academic terms can be ended" },
          { status: 400 }
        );
      }
  
      // Update the academic term to end it
      const updatedAcademicTerm = await prisma.academicTerm.update({
        where: { id: academicTermId },
        data: {
          endDate: new Date(), // Set endDate to the current date
          status: "Inactive", // Set status to Inactive
        },
      });
  
      return NextResponse.json(
        { message: "Academic Term ended successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error ending academic term:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  