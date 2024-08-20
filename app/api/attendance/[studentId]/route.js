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
      return new Response(JSON.stringify({ error: 'Student ID is required' }), { status: 400 });
    }

    // Get current academic term
    const currentTerm = await getCurrentAcademicTerm();
    if (!currentTerm) {
      return new Response(JSON.stringify({ error: 'Current academic term not found' }), { status: 404 });
    }

    // Fetch attendance records for the student within the current academic term
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        studentId,
        clockIn: {
          gte: currentTerm.startDate,
          lt: currentTerm.endDate,
        },
      }
    });

    return new Response(JSON.stringify(attendanceRecords), { status: 200 });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
