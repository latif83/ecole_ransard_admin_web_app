import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
// import { verifyToken } from "@/actions/action";

export async function GET() {
  try {
    // Find the active academic term
    const activeAcademicTerm = await prisma.academicTerm.findFirst({
      where: {
        status: 'Active',
      },
      orderBy: {
        startDate: 'desc', // To get the most recent active term if needed
      },
    });

    if (!activeAcademicTerm) {
      return NextResponse.json(
        { error: 'No active academic term found.' },
        { status: 404 }
      );
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize the time part to the start of the day

    // Fetch upcoming events for the active academic term
    const events = await prisma.Event.findMany({
      where: {
        academicTermId: activeAcademicTerm.id,
        eventDate: {
          gte: today, // Greater than or equal to today's date
        },
      },
      orderBy: {
        eventDate: 'asc', // Order events by date
      },
    });

    return NextResponse.json(
      events,
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
