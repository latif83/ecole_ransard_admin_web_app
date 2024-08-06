import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse the incoming JSON request body
    const { sectionName, classId, teacherId } = await req.json();

    // Validate required fields
    if (!sectionName || !classId) {
      return NextResponse.json(
        { error: "Section Name and classId are required" },
        { status: 400 }
      );
    }

    // Create a new class section
    const newClassSection = await prisma.ClassSections.create({
      data: {
        sectionName,
        classId,
        teacherId,
      },
    });

    // Return the newly created class section
    return NextResponse.json(
      { message: "Section created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating class section:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PUT(req, { params }) {
  try {
    const { sectionId,sectionName, teacherId } = await req.json();
    console.log({ sectionId,sectionName, teacherId } )

    // Validate required fields
    if (!sectionName) {
      return NextResponse.json(
        { error: "Section Name is required" },
        { status: 400 }
      );
    }

    // Check if the class section exists
    const classSectionExists = await prisma.ClassSections.findUnique({
      where: { id: sectionId },
    });

    if (!classSectionExists) {
      return NextResponse.json(
        { error: "Class Section not found" },
        { status: 404 }
      );
    }

    // Update the class section
    const updatedClassSection = await prisma.ClassSections.update({
      where: { id: sectionId },
      data: {
        sectionName,
        teacherId,
      },
    });

    // Return the updated class section
    return NextResponse.json(
      { message: "Section updated successfully!", section: updatedClassSection },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating class section:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}