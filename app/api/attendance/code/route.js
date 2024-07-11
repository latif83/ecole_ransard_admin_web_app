import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

// POST API to create a new attendance code
export async function POST(req) {
    try {
      // Check if the user is authenticated
      const hasCookies = cookies().has("access-token");
  
      if (!hasCookies) {
        // return NextResponse.json(
        //   {
        //     error:
        //       "You're unauthorized to create an attendance code, please login to continue.",
        //   },
        //   { status: 401 }
        // );
      }
  
      // Verify the access token
      const cookie = cookies().get("access-token");
  
      if (!cookie?.value) {
        // return NextResponse.json(
        //   { error: "Missing access token" },
        //   { status: 401 }
        // );
      }
  
    //   const verificationResult = await verifyToken(cookie?.value);
  
    //   if (!verificationResult.status) {
    //     return NextResponse.json(
    //       { error: "Invalid or expired access token" },
    //       { status: 401 }
    //     );
    //   }
  
      // Parse the request body
      let { code } = await req.json();
  
      code = code.toString();
  
      // Get the user ID from the decoded token
    //   const { userId: createdById } = verificationResult.decodedToken;

    const createdById = "clygm3d1w0000v5h9kvyrx4jo"
  
      // Get the current date
      const currentDate = new Date();
  
      // Check if there's an existing attendance code for the current day
      const existingAttendanceCode = await prisma.attendanceCode.findFirst({
        where: {
          createdAt: {
            gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate()
            ),
            lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() + 1
            ),
          },
        },
      });
  
      if (existingAttendanceCode) {
        return NextResponse.json(
          { error: "An attendance code already exists for today" },
          { status: 400 }
        );
      }
  
      // Create the attendance code
      const newAttendanceCode = await prisma.attendanceCode.create({
        data: {
          code,
          createdById,
        },
      });
  
      return NextResponse.json(
        { message: "Attendance code created successfully" },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating attendance code:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

export async function GET(req) {
    try {
      // Check if the user is authenticated
      const hasCookies = cookies().has("access-token");
  
      if (!hasCookies) {
        // return NextResponse.json(
        //   {
        //     error:
        //       "You're unauthorized to fetch attendance codes, please login to continue.",
        //   },
        //   { status: 401 }
        // );
      }
  
      // Verify the access token
      const cookie = cookies().get("access-token");
  
      if (!cookie?.value) {
        // return NextResponse.json(
        //   { error: "Missing access token" },
        //   { status: 401 }
        // );
      }
  
    //   const verificationResult = await verifyToken(cookie?.value);
  
    //   if (!verificationResult.status) {
    //     return NextResponse.json(
    //       { error: "Invalid or expired access token" },
    //       { status: 401 }
    //     );
    //   }
  
      // Fetch attendance codes along with the count of associated students
      const attendanceCodes = await prisma.attendanceCode.findMany({
        select: {
          id: true,
          code: true,
          createdAt: true,
          attendance: {
            select: {
              id: true,
              AttendanceCodeId: true,
              studentId: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
  
      // Prepare response data
      const attendanceCodeData = attendanceCodes.map((attendanceCode) => ({
        id: attendanceCode.id,
        code: attendanceCode.code,
        createdAt: attendanceCode.createdAt,
        numStudentsPresent: attendanceCode.attendance.length,
      }));

      console.log({attendanceCodeData})
  
      return NextResponse.json(
        { attendanceCodes: attendanceCodeData },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching attendance codes:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }