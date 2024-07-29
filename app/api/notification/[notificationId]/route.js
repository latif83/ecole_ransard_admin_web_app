import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function DELETE(req, {params} ) {
    try {
      const {notificationId} = params;
  
      // Check if notificationId is provided
      if (!notificationId) {
        return NextResponse.json(
          { message: "Notification ID is required." },
          { status: 400 }
        );
      }
  
      // Delete the notification from the database
      await prisma.notification.delete({
        where: {
          id: notificationId,
        },
      });
  
      return NextResponse.json(
        { message: "Notification removed successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }