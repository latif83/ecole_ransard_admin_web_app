import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const parents = await prisma.Parents.findMany({
      include: {
        students: {
          include: {
            class: true,
            ClassSections: true,
          },
        }, // Include the students related to each parent
      },
    });
    
    return new NextResponse(JSON.stringify({ parents }), { status: 200 });
  } catch (error) {
    console.error("Error fetching parents:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone, address, students,occupation } =
      await req.json();

    if (!firstName || !lastName || !email || !phone) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Create new parent
    const newParent = await prisma.parents.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        occupation
      },
    });

    // Update students with the new parent ID
    if (students && students.length > 0) {
      const studentIds = students.map((student) => student.studentId);
      await prisma.students.updateMany({
        where: {
          id: { in: studentIds },
        },
        data: {
          parentId: newParent.id,
        },
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Parent created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating parent:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, firstName, lastName, email, phone, address, students } =
      await req.json();

    if (!id || !firstName || !lastName || !email || !phone) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Update parent details
    const updatedParent = await prisma.parents.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
      },
    });

    // Update students with the new parent ID
    if (students && students.length > 0) {
      // Unlink previous students
      await prisma.students.updateMany({
        where: { parentId: id },
        data: { parentId: null },
      });

      // Filter out undefined student IDs
      const studentIds = students
        .map((student) => student.studentId)
        .filter((id) => id !== undefined && id !== null);

      if (studentIds.length > 0) {
        // Link new students
        await prisma.students.updateMany({
          where: {
            id: { in: studentIds },
          },
          data: {
            parentId: id,
          },
        });
      }
    }

    return new NextResponse(
      JSON.stringify({ message: "Parent updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating parent:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
