import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function DELETE(req, { params }) {
  const { parentId } = params;

  try {
    // Delete the parent
    const deletedParent = await prisma.parents.delete({
      where: { id: parentId },
    });

    return new NextResponse(
      JSON.stringify({ message: "Parent deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting parent:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

//  Get parents wards
export async function GET(request, { params }) {
  try {
    const { parentId } = params;

    if (!parentId) {
      return new Response(JSON.stringify({ error: "Parent ID is required" }), {
        status: 400,
      });
    }

    // Fetch all wards (students) for the parent
    const wards = await prisma.Students.findMany({
      where: {
        parentId,
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

    if (wards.length === 0) {
      return NextResponse.json({ message: "No wards found!" }, { status: 404 });
    }

    return NextResponse.json(wards, { status: 200 });
  } catch (error) {
    console.error("Error fetching wards:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
