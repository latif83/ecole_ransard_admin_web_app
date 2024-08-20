import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const classSectionId = url.searchParams.get('classSectionId');

    if (!date) {
      return new Response(JSON.stringify({ error: 'Date parameter is required' }), { status: 400 });
    }

    // Ensure date is in YYYY-MM-DD format
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid date format' }), { status: 400 });
    }

    // Create start and end of the day Date objects
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    // Fetch all students for the given class section
    const students = await prisma.students.findMany({
      where: {
        ...(classSectionId && { classSectionsId: classSectionId }) // Conditional filter
      }
    });

    // Fetch attendance records for the specified date
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        clockIn: {
          gte: startOfDay,
          lt: endOfDay
        },
        ...(classSectionId && { student: { classSectionsId: classSectionId } }) // Conditional filter
      },
      include: {
        student: true // Include student details in the result
      }
    });

    // Create a map for quick lookup of attendance records by studentId
    const attendanceMap = new Map(
      attendanceRecords.map(record => [
        record.studentId,
        {
          status: record.status,
          clockIn: record.clockIn,
          clockOut: record.clockOut,
          remarks: record.remarks
        }
      ])
    );

    // Map students to include attendance information
    const result = students.map(student => {
      const attendance = attendanceMap.get(student.id) || {
        status: 'unknown',
        clockIn: null,
        clockOut: null,
        remarks: null
      };

      return {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        status: attendance.status,
        clockIn: attendance.clockIn,
        clockOut: attendance.clockOut,
        remarks: attendance.remarks,
        classSectionId: student.classSectionsId
      };
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}


export async function POST(request) {
  try {
    const { studentIds, classSectionId, status } = await request.json();

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return new Response(JSON.stringify({ error: 'Student IDs are required and should be an array' }), { status: 400 });
    }
    
    if (!classSectionId) {
      return new Response(JSON.stringify({ error: 'Class Section ID is required' }), { status: 400 });
    }
    
    if (!['present', 'absent'].includes(status)) {
      return new Response(JSON.stringify({ error: 'Invalid status' }), { status: 400 });
    }

    // Get today's date
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Iterate over student IDs and handle attendance
    await Promise.all(studentIds.map(async (studentId) => {
      // Check if the student has already clocked in today
      const existingRecord = await prisma.Attendance.findFirst({
        where: {
          studentId,
          clockIn: {
            gte: startOfDay,
            lt: endOfDay
          }
        }
      });

      const currentTime = new Date();

      if (existingRecord) {
        // Update existing record
        await prisma.Attendance.update({
          where: { id: existingRecord.id },
          data: { status }
        });
      } else {
        // Create new record
        await prisma.Attendance.create({
          data: {
            studentId,
            clockIn: currentTime,
            status,
            classSectionId
          }
        });
      }
    }));

    return new Response(JSON.stringify({ message: 'Attendance records processed successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error creating or updating attendance:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}