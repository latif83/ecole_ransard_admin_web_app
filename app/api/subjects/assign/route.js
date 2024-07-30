import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export async function POST(req) {
    try {
      // Parse the incoming JSON request body
      const { classId, subjectId } = await req.json();
  
      // Validate required fields
      if (!classId || !subjectId) {
        return NextResponse.json(
          { error: "classId and subjectId are required" },
          { status: 400 }
        );
      }
  
      // Check if the class and subject exist
      const classExists = await prisma.classes.findUnique({
        where: { id: classId },
      });
  
      const subjectExists = await prisma.subjects.findUnique({
        where: { id: subjectId },
      });
  
      if (!classExists) {
        return NextResponse.json(
          { error: "Class not found" },
          { status: 404 }
        );
      }
  
      if (!subjectExists) {
        return NextResponse.json(
          { error: "Subject not found" },
          { status: 404 }
        );
      }
  
      // Check if the subject is already assigned to the class
      const existingAssignment = await prisma.assignedSubjects.findFirst({
        where: { 
          classId,
          subjectId
        },
      });
  
      if (existingAssignment) {
        return NextResponse.json(
          { error: "Subject is already assigned to this class" },
          { status: 400 }
        );
      }
  
      // Create an assignment of the subject to the class
      const newAssignment = await prisma.assignedSubjects.create({
        data: {
          classId,
          subjectId,
        },
      });
  
      // Return a success message
      return NextResponse.json({ message: "Subject assigned successfully!" }, { status: 201 });
    } catch (error) {
      console.error("Error assigning subject to class:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }