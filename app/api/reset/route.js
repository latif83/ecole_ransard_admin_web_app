// Import PrismaClient and bcrypt
import prisma from "@/config/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// Define the reset password route
export async function POST(req) {
  try {
    // Parse the request body
    const { userIdentity, password, role } = await req.json();

    // Initialize the table name based on the role
    let tableName = "";

    // Determine the table name based on the role
    if (role === "admin") {
      tableName = "admins";
    } else if (role === "teacher") {
      tableName = "Teachers";
    } else if (role === "parents") {
      tableName = "Parents";
    } else {
      // Invalid role
      return NextResponse.json({ error: "Invalid role" }, { status: 401 });
    }

    // Check if the user exists
    let user = await prisma[tableName].findUnique({
      where: {
        id: userIdentity,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 401 });
    }

       // Update the user's password
       const resetPassword =  await prisma[tableName].update({
        where: {
          id: userIdentity,
        },
        data: {
          password
        },
      });

    if (resetPassword) {
      // Successful login
      return NextResponse.json(
        {
          message: "Password reset successfully!",
        },
        { status: 200 }
      );
    } else {
      // Invalid email or password
      return NextResponse.json(
        { error: "There was an error resetting your password!" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    // Close the PrismaClient instance
    // await prisma.$disconnect();
  }
}
