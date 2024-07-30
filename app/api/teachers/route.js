import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body for student data
    const { firstName, lastName, email, address, phone } = await req.json();

    // Check if required fields are provided
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: firstName, lastName, birthDate, classId",
        },
        { status: 400 }
      );
    }

    // Create the new student in the database
    const newTeacher = await prisma.Teachers.create({
      data: {
        firstName,
        lastName,
        email,
        address,
        phone,
        password : 'ronsard_123'
      },
    });

    return NextResponse.json(
      { message: "Teacher created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating teacher:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
    try {
      // Fetch all teachers from the database, including their assigned class sections
      const teachers = await prisma.Teachers.findMany({
        include: {
          classSections: {
            include: {
              class: true, // Include the class data if needed
            },
          },
        },
      });
  
      // Return the list of teachers along with their assigned class sections
      return NextResponse.json({ teachers }, { status: 200 });
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
