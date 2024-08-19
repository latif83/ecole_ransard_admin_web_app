import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
      // Parse the request body
      const { assignedTeacherId, subjectId } = await req.json();
  
      if (!assignedTeacherId || !subjectId) {
        return NextResponse.json({ error: "Assigned Teacher ID and Subject ID are required" }, { status: 400 });
      }
  
      // Check if the subject assignment already exists
      const existingAssignment = await prisma.AssignedSubjects.findFirst({
        where: {
          assignedTeacherId: assignedTeacherId,
          subjectId: subjectId,
        },
      });
  
      if (existingAssignment) {
        return NextResponse.json({ message: "Subject is already assigned to this teacher" }, { status: 400 });
      }
  
      // Create the assignment
      const newAssignment = await prisma.AssignedSubjects.create({
        data: {
          assignedTeacherId: assignedTeacherId,
          subjectId: subjectId,
        },
      });
  
      // Return the created assignment
      return NextResponse.json({message:"Subject successfully assigned to teacher!"}, { status: 201 });
    } catch (error) {
      console.error("Error assigning subject to teacher:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

export async function GET(req) {
  try {

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get("teacherId");
    const classSectionId = searchParams.get("classSectionId");

    // Validate parameters
    if (!teacherId || !classSectionId) {
      return NextResponse.json(
        { error: 'Missing required query parameters: teacherId or classSectionId' },
        { status: 400 }
      );
    }

    // Retrieve assigned subjects for the specified teacher and class section
    const assignedSubjects = await prisma.assignedSubjects.findMany({
      where: {
        assignedTeacher: {
          teacherId: teacherId,
          classId: classSectionId,
        },
      },
      include: {
        subject: true, // Include subject details
      },
    });

    // Return the subjects
    return NextResponse.json(
      assignedSubjects.map((assignment) => ({
        id: assignment.id,
        subjectId: assignment.subjectId,
        subjectName: assignment.subject.name,
        createdAt: assignment.createdAt,
        updatedAt: assignment.updatedAt,
      })),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving assigned subjects:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
