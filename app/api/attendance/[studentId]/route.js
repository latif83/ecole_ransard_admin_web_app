import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// Function to get the current academic term
async function getCurrentAcademicTerm() {
  const currentTerm = await prisma.academicTerm.findFirst({
    where: { status: "Active" },
  });
  return currentTerm;
}

// API to fetch a student's attendance for the active academic term
export async function GET(request,{params}) {
  try {
    
    const {studentId} = params

    if (!studentId) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    // Get current academic term
    const currentTerm = await getCurrentAcademicTerm();
    if (!currentTerm) {
      return NextResponse.json({ message: 'No Active academic term!' }, { status: 404 });
    }

    // Fetch attendance records for the student within the current academic term
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        studentId,
        // clockIn: {
        //   gte: currentTerm.startDate,
        //   lt: currentTerm.endDate,
        // },
      }
    });

    return NextResponse.json(attendanceRecords, { status: 200 });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
