import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
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

    // Fetch events for the active academic term
    const events = await prisma.Event.findMany({
      where: {
        academicTermId: activeAcademicTerm.id,
      },
      orderBy: {
        eventDate: 'asc', // Order events by date
      },
    });

    return NextResponse.json(
       events ,
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
