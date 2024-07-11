import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

// GET API to get all students clocked in for a particular attendance using the attendance code
export async function GET(req) {
    try {
      const hasCookies = cookies().has("access-token");
      let user = {};
  
      if (!hasCookies) {
        // return NextResponse.json(
        //   {
        //     error:
        //       "You're unauthorized to access employee attendance, please login to continue.",
        //   },
        //   { status: 400 }
        // );
      }
  
      if (hasCookies) {
        const cookie = cookies().get("access-token");
  
        if (cookie?.value) {
          const verificationResult = await verifyToken(cookie.value);
  
          if (verificationResult.status) {
            user = verificationResult.decodedToken;
            // Now you have the user details, you can use them as needed
            // console.log("User details:", user);
          } else {
            // Handle invalid token
            return NextResponse.json(
              { error: "Your session is expired, please login" },
              { status: 400 }
            );
          }
        }
      }
  
      // Parse query parameters
      const { searchParams } = new URL(req.url);
      const attendanceCode = searchParams.get("attendanceCode");
      const classId = searchParams.get("classId");
  
      // Fetch all attendance records with the matching attendance code
      let studentAttendance;

      if (classId) {
        // Fetch all attendance records with the matching attendance code and classId
        studentAttendance = await prisma.attendance.findMany({
          where: {
            AttendanceCodeId: attendanceCode,
            student: {
              classId,
            },
          },
          include: {
            student: {
              include: {
                class: true,
              },
            },
          },
        });
      } else {
        // Fetch all attendance records with the matching attendance code
        studentAttendance = await prisma.attendance.findMany({
          where: {
            AttendanceCodeId: attendanceCode,
          },
          include: {
            student: {
              include: {
                class: true,
              },
            },
          },
        });
      }
  
      // Extract student details along with class information from the fetched attendance records
      const students = studentAttendance.map((attendance) => ({
        id: attendance.student.id,
        firstName: attendance.student.firstName,
        lastName: attendance.student.lastName,
        clockIn: attendance.clockIn,
        clockOut: attendance.clockOut,
        student : `${attendance.student.firstName} ${attendance.student.lastName}`,
        class: attendance.student.class.className,
        classId: attendance.student.class.className,
      }));
  
  
      return NextResponse.json({ students }, { status: 200 });
    } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }