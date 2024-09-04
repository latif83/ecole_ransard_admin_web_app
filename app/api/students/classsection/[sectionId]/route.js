import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, params) {
  try {
    const classSectionsId = params.params.sectionId;

    if (!classSectionsId) {
      return NextResponse.json(
        { message: "Section ID is required." },
        { status: 400 }
      );
    }

    const students = await prisma.students.findMany({
      where: {
        classSectionsId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        class: {
          select: {
            className: true,
          },
        },
        ClassSections: {
          select: {
            sectionName: true,
          },
        },
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
