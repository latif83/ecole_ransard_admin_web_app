import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const classId = params.classId;

    if (!classId) {
      return NextResponse.json(
        { error: "classId is required" },
        { status: 400 }
      );
    }

    // Fetch the class details along with the related data
    const classDetails = await prisma.classes.findUnique({
      where: { id: classId },
      include: {
        students: true,
        ClassSections: {
          include: {
            teacher: true, // Include the assigned teacher
            students: true, // Include students in each class section
          },
        },
        assignedSubjects: {
          include : {
            subject : true
          }
        }, // Subjects assigned to the class
      },
    });

    if (!classDetails) {
      return NextResponse.json(
        { error: "Class not found" },
        { status: 404 }
      );
    }

    // Calculate the summary data
    const numberOfStudents = classDetails.students.length;
    const numberOfClassSections = classDetails.ClassSections.length;
    const numberOfSubjects = classDetails.assignedSubjects.length;

    // Structure the response
    const response = {
      numberOfStudents,
      numberOfClassSections,
      numberOfSubjects,
      className: classDetails.className,
      classSections: classDetails.ClassSections.map(section => ({
        sectionId: section.id,
        sectionName: section.sectionName,
        teacher: section.teacher ? {
          id: section.teacher.id,
          firstName: section.teacher.firstName,
          lastName: section.teacher.lastName,
        } : null,
        numberOfStudents: section.students.length, // Count of students in the section
      })),
      subjects: classDetails.assignedSubjects.map(subject => ({
        id: subject.subject.id,
        name: subject.subject.name,
      })),
    };

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error fetching class summary:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req, params ) {
    try {
      const classId = params.params.classId;
  
      // Check if class ID is provided
      if (!classId) {
        return NextResponse.json(
          { message: "Class ID is required." },
          { status: 400 }
        );
      }
  
      // Delete the class from the database
      await prisma.classes.delete({
        where: {
          id: classId,
        },
      });
  
      return NextResponse.json(
        { message: "Class deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting class:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }