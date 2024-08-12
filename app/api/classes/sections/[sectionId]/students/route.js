import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { sectionId: classSectionId } = params;

    if (!classSectionId) {
      return NextResponse.json(
        { message: "Class section ID is required" },
        { status: 400 }
      );
    }

    const students = await prisma.Students.findMany({
      where: {
        classSectionsId: classSectionId,
      },
      include: {
        parents: true,
      },
    });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
