import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
  try {
    
    const {teacherId} = params;

    if (!teacherId) {
      return NextResponse.json(
        { error: "Teacher ID is required" },
        { status: 400 }
      );
    }

    // Fetch teacher details by ID
    const teacher = await prisma.Teachers.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(teacher, { status: 200 });
  } catch (error) {
    console.error("Error fetching teacher details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
