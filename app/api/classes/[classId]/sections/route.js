import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
    try {
      const { classId } = params;
  
      if (!classId) {
        return NextResponse.json(
          { error: "classId is required" },
          { status: 400 }
        );
      }
  
      // Fetch all sections for the given class ID
      const classSections = await prisma.ClassSections.findMany({
        where: { classId }
      });
  
      // Return the list of class sections
      return NextResponse.json({ classSections }, { status: 200 });
    } catch (error) {
      console.error("Error fetching class sections:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }