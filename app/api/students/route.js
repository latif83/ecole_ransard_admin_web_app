import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body for student data
    const { firstName, lastName, birthDate, address, classId } =
      await req.json();

    // Check if required fields are provided
    if (!firstName || !lastName || !birthDate || !classId) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: firstName, lastName, birthDate, classId",
        },
        { status: 400 }
      );
    }
    // Convert birthDate to ISO-8601 format
    const isoBirthDate = new Date(birthDate).toISOString();

    // Create the new student in the database
    const newStudent = await prisma.students.create({
      data: {
        firstName,
        lastName,
        birthDate: isoBirthDate,
        address,
        classId,
      },
    });

    return NextResponse.json(
      { message: "Student created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Fetch all students from the database
    const students = await prisma.students.findMany({
      include: {
        class: true, // Including class data if needed
      },
    });

    // Return the list of students
    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, firstName, lastName, birthDate, address, classId } =
      await req.json();

    // Check if required fields are provided
    if (!id || !firstName || !lastName || !birthDate || !classId) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: id, firstName, lastName, birthDate, classId",
        },
        { status: 400 }
      );
    }

    // Convert birthDate to ISO-8601 format
    const isoBirthDate = new Date(birthDate).toISOString();

    // Update the student in the database
    const updatedStudent = await prisma.students.update({
      where: { id },
      data: {
        firstName,
        lastName,
        birthDate : isoBirthDate,
        address,
        classId,
      },
    });

    return NextResponse.json(
      { message: "Student updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
