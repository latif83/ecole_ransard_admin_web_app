import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

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