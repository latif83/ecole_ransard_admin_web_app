import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body for student data

      const { title, content, date, sendTo, studentId, classId } = await req.json();

      const createdBy = "changelater"

    // Check if required fields are provided
    // if (!firstName || !lastName || !birthDate || !classId) {
    //   return NextResponse.json(
    //     {
    //       message:
    //         "Missing required fields: firstName, lastName, birthDate, classId",
    //     },
    //     { status: 400 }
    //   );
    // }

    // Convert dateTime to ISO-8601 format
    const isoDateTime = date ? new Date(date).toISOString() : null;

     // Save notification data to the database
     const notification = await prisma.notification.create({
        data: {
          title,
          content,
          dateTime : isoDateTime,
          studentId,
          classId,
          sendToAll : sendTo == "all",
          createdBy,
        },
      });


    return NextResponse.json(
      { message: "Notification created and sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
    try {
      // Fetch all notifications from the database
      const notifications = await prisma.notification.findMany({
        include: {
          class: true,
          student : true
        },
      });

    //   console.log({notifications})
  
      // Return the list of notifications
      return NextResponse.json({ notifications }, { status: 200 });
    } catch (error) {
      console.error("Error fetching students:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }