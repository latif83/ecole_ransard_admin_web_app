import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";


export async function POST(req) {
  try {
    const { title, content, date, sendTo, studentId, classId } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: 'Title and content are required fields' },
        { status: 400 }
      );
    }

    const createdBy = "changelater"; // This should be dynamically set based on the authenticated user

    const isoDateTime = date ? new Date(date).toISOString() : null;

    const notification = await prisma.notification.create({
      data: {
        title,
        content,
        dateTime: isoDateTime,
        studentId: sendTo === 'student' ? studentId : null,
        classId: sendTo === 'class' ? classId : null,
        sendToAll: sendTo === 'all',
        createdBy,
      },
    });

      // Send the notification
      // if (sendTo === 'all') {
      //   // Fetch all parents
      //   const parents = await prisma.parent.findMany();
      //   // Send notification to all parents
      //   parents.forEach(parent => {
      //     sendNotificationToParent(parent.email, notification);
      //   });
      // } else if (sendTo === 'class') {
      //   // Fetch parents of students in the class
      //   const studentsInClass = await prisma.student.findMany({
      //     where: { classId: classId },
      //     include: { parent: true },
      //   });
      //   // Send notification to each parent
      //   studentsInClass.forEach(student => {
      //     if (student.parent) {
      //       sendNotificationToParent(student.parent.email, notification);
      //     }
      //   });
      // } else if (sendTo === 'student') {
      //   // Fetch the student's parent
      //   const student = await prisma.student.findUnique({
      //     where: { id: studentId },
      //     include: { parent: true },
      //   });
      //   if (student && student.parent) {
      //     sendNotificationToParent(student.parent.email, notification);
      //   }
      // }

    return NextResponse.json(
      { message: "Notification created and sent successfully", notification },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating notification:", error);
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
        orderBy: {
          createdBy: 'desc',
        },
      });

      // console.log({notifications})
  
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

  export async function PUT(req) {
    try {
      const { id, title, content, date, sendTo, studentId, classId } = await req.json();
  
      if (!id || !title || !content) {
        return NextResponse.json(
          { message: 'ID, title, and content are required fields' },
          { status: 400 }
        );
      }
  
      const isoDateTime = date ? new Date(date).toISOString() : null;
  
      // Update the notification in the database
      const notification = await prisma.notification.update({
        where: { id },
        data: {
          title,
          content,
          dateTime: isoDateTime,
          studentId: sendTo === 'student' ? studentId : null,
          classId: sendTo === 'class' ? classId : null,
          sendToAll: sendTo === 'all',
        },
      });
  
      return NextResponse.json(
        { message: "Notification updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating notification:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }