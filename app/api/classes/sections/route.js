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


// GET API to fetch all classes
export async function GET(req) {
  try {
    // Fetch all classes from the database
    const classes = await prisma.classes.findMany({
      include : {
        ClassSections: {
          orderBy: {
            createdAt: 'asc', // Order ClassSections by createdAt
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

   // Combine class details with their sections
// Combine all class sections into a single array
const classSections = classes.flatMap((classItem) => 
  classItem.ClassSections.map((section) => ({
    classId: classItem.id,
    className: classItem.className, // Assuming classItem has a `name` field
    sectionId: section.id,
    sectionName: section.sectionName,
  }))
);

    // console.log({classes})

    // Return the list of classes as JSON response
    return NextResponse.json(classSections, { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
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