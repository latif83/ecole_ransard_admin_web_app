import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

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
  