import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
      const { title, description } = await req.json();
  
      // Validate required fields
      if (!title) {
        return NextResponse.json(
          { error: "Title is required" },
          { status: 400 }
        );
      }
  
      // Create a new FeeDetail
      const newFeeDetail = await prisma.FeeDetail.create({
        data: {
          title,
          description,
        },
      });
  
      // Return the newly created fee detail
      return NextResponse.json(
        { message: "Fee created successfully!" },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating fee detail:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  export async function GET() {
    try {
      // Fetch all fee types
      const feeTypes = await prisma.FeeDetail.findMany();
  
      // Return the list of fee types
      return NextResponse.json(
        { feeTypes },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error retrieving fee types:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }