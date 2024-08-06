import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req, { params }) {
  try {
    const { termId: academicTermId } = params;
    const { title, description, eventDate } = await req.json();

    // Validate required fields
    if (!title || !eventDate || !description) {
      return NextResponse.json(
        { error: "title, eventDate, and description are required" },
        { status: 400 }
      );
    }

    // Check if the academic term exists
    const academicTermExists = await prisma.academicTerm.findUnique({
      where: { id: academicTermId },
    });

    if (!academicTermExists) {
      return NextResponse.json(
        { error: "Academic Term not found" },
        { status: 404 }
      );
    }

    // Create a new event linked to the academic term
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        eventDate: new Date(eventDate),
        academicTermId,
      },
    });

    // Return the newly created event
    return NextResponse.json(
      { message: "Event created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { eventId,title, description, eventDate } = await req.json();

    // Validate required fields
    if (!title || !eventDate || !description) {
      return NextResponse.json(
        { error: "title, eventDate, and description are required" },
        { status: 400 }
      );
    }

    // Check if the event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Update the event
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        title,
        description,
        eventDate: new Date(eventDate),
      },
    });

    // Return the updated event
    return NextResponse.json(
      { message: "Event updated successfully!", event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
