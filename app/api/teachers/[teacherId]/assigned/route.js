import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    try {
        
      const {teacherId} = params
  
      if (!teacherId) {
        return NextResponse.json({ error: "Teacher ID is required" }, { status: 400 });
      }
  
      // Fetch the assigned classes and subjects for the teacher
      const assignedClasses = await prisma.AssignedTeachers.findMany({
        where: { teacherId: teacherId },
        include: {
          class: {
            include : {
              class : true
            }
          }, // Include class details
          assignedSubjects: {
            include: {
              subject: true, // Include subject details
            },
          },
        },
      });
  
      // Map the result to get class and subject details
      const result = assignedClasses.map((assignment) => ({
        classSectionId : `${assignment.class.id}`,
        classId :  `${assignment.class.class.id}`,
        classSectionName: `${assignment.class.class.className} (${assignment.class.sectionName})`,
        subjects: assignment.assignedSubjects.map((assignedSubject) => assignedSubject.subject),
      }));
  
      // Return the formatted response
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error("Error fetching assigned classes and subjects:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

export async function POST(req) {
    try {
      // Parse the request body
      const { teacherId, classId } = await req.json();
  
      if (!teacherId || !classId) {
        return NextResponse.json({ error: "Teacher ID and Class ID are required" }, { status: 400 });
      }
  
      // Check if the class assignment already exists
      const existingAssignment = await prisma.AssignedTeachers.findFirst({
        where: {
          teacherId: teacherId,
          classId: classId,
        },
      });
  
      if (existingAssignment) {
        return NextResponse.json({ error: "Class is already assigned to this teacher" }, { status: 400 });
      }
  
      // Create the assignment
      const newAssignment = await prisma.AssignedTeachers.create({
        data: {
          teacherId: teacherId,
          classId: classId,
        },
      });
  
      // Return the created assignment
      return NextResponse.json({message:"Class assigned to teacher successfully!"}, { status: 201 });
    } catch (error) {
      console.error("Error assigning class to teacher:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  