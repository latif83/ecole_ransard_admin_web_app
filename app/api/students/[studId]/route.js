import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function DELETE(req, params ) {
    try {
      const studId = params.params.studId;
  
      // Check if student ID is provided
      if (!studId) {
        return NextResponse.json(
          { message: "Student ID is required." },
          { status: 400 }
        );
      }
  
      // Delete the class from the database
      await prisma.students.delete({
        where: {
          id: studId,
        },
      });
  
      return NextResponse.json(
        { message: "Student removed successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting student:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }