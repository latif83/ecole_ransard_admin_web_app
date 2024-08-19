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
        return NextResponse.json(
          { error: "name is required" },
          { status: 400 }
        );
      }
  
      // Create a new subject
      const newSubject = await prisma.Subjects.create({
        data: {
          name,
        },
      });
  
      // Return the newly created subject
      return NextResponse.json({ message : "New Subject added successfully!" }, { status: 201 });
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
        return NextResponse.json({ message: "Subject updated successfully!" }, { status: 200 });
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