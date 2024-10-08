import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

// POST API to create a new class

export async function POST(req) {
  try {

    // Parse request body for class data
    const { className } = await req.json();

    // Check if class name is provided
    if (!className) {
      return NextResponse.json(
        { message: "Class name is required." },
        { status: 400 }
      );
    }

    // Create the new class in the database
    const newClass = await prisma.classes.create({
      data: {
        className,
      },
    });

    return NextResponse.json(
      { message: "Class created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating class:", error);
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
      orderBy: {
        createdAt: "asc",
      },
    });

    // console.log({classes})

    // Return the list of classes as JSON response
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT API to update a class
export async function PUT(req) {
  try {
    // Parse the request body for updated class data
    const { id, className } = await req.json();

    // Check if class name is provided
    if (!className) {
      return NextResponse.json(
        { message: "Class name is required." },
        { status: 400 }
      );
    }

    // Update the class in the database
    const updatedClass = await prisma.classes.update({
      where: { id },
      data: {
        className,
      },
    });

    return NextResponse.json(
      { message: "Class updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating class:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}