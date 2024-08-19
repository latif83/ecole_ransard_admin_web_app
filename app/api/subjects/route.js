import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse the incoming JSON request body
    const { name } = await req.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    // Create a new subject
    const newSubject = await prisma.Subjects.create({
      data: {
        name,
      },
    });

    // Return the newly created subject
    return NextResponse.json(
      { message: "New Subject added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating subject:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    // Parse the incoming JSON request body
    const { id, name } = await req.json();

    // Validate required fields
    if (!id || !name) {
      return NextResponse.json(
        { error: "id and name are required" },
        { status: 400 }
      );
    }

    // Update the subject details
    const updatedSubject = await prisma.Subjects.update({
      where: { id },
      data: { name },
    });

    // Return the updated subject details
    return NextResponse.json(
      { message: "Subject updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating subject:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Fetch all subjects from the database
    const subjects = await prisma.Subjects.findMany();

    // Return the list of subjects
    return NextResponse.json({ subjects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    // Check if the subject has associations
    const subject = await prisma.Subjects.findUnique({
      where: { id },
      include: {
        classSubjects: true,
        AssignedSubjects: true,
        Assessments: true
      },
    });

    if (!subject) {
      return NextResponse.json(
        { message: "Subject not found" },
        { status: 404 }
      );
    }

    // If there are associations, return an error message
    if (
      subject.classSubjects.length > 0 ||
      subject.AssignedSubjects.length > 0 ||
      subject.Assessments.length > 0
    ) {
      return NextResponse.json(
        {
          message:
            "Subject has associations. Please remove associations before deleting.",
        },
        { status: 400 }
      );
    }

    // Delete the subject
    const deletedSubject = await prisma.Subjects.delete({
      where: { id },
    });

    // Return a success message
    return NextResponse.json(
      { message: "Subject deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subject:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
