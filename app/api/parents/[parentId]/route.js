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