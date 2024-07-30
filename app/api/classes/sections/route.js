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
