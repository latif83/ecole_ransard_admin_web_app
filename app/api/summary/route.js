import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const classSectionId = searchParams.get("classSectionId");
    const teacherId = searchParams.get("teacherId");

    if (!classSectionId || !teacherId) {
      return NextResponse.json(
        { message: "Class Section ID and Teacher ID are required" },
        { status: 400 }
      );
    }

    const studentCount = await prisma.Students.count({
      where: {
        classSectionsId: classSectionId,
      },
    });

    const assignedTeacher = await prisma.AssignedTeachers.findFirst({
      where: {
        teacherId,
        classId: classSectionId,
      },
    });

    if (!assignedTeacher) {
      return NextResponse.json(
        { message: "Teacher is not assigned to this class section" },
        { status: 404 }
      );
    }

    const subjectCount = await prisma.AssignedSubjects.count({
      where: {
        assignedTeacherId: assignedTeacher.id,
      },
    });

    const response = {
      studentCount,
      subjectCount,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching class section overview:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
