import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, params) {
  try {
    const classId = params.params.classId;

    if (!classId) {
      return NextResponse.json(
        { message: "Class ID is required." },
        { status: 400 }
      );
    }

    const students = await prisma.students.findMany({
      where: {
        classId,
      },
    });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error("Error fetching students by class:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
