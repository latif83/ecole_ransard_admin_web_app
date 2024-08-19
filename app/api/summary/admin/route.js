import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        // Fetch counts
        const [teacherCount, studentCount, parentCount] = await Promise.all([
            prisma.Teachers.count(),
            prisma.Students.count(),
            prisma.Parents.count()
        ]);

        // Return counts as JSON
        return new NextResponse(JSON.stringify({
            teacherCount,
            studentCount,
            parentCount
        }), { status: 200 });
    } catch (error) {
        console.error("Error fetching summary:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}