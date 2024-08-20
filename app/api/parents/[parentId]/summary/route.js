import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req,{params}) {
  try {
    const { parentId } = params;
    // Fetch the current academic year and term
    const currentAcademicYr = await prisma.academicYear.findFirst({
      where: {
        status: "Active", // Assuming there's a field to indicate the current year/term
      },
      select: {
        year: true,
      },
    });

    const currentAcademicTerm = await prisma.AcademicTerm.findFirst({
        where: {
          status: "Active", // Assuming there's a field to indicate the current year/term
        },
        select: {
            termName: true,
        },
      });

    if (!currentAcademicYr) {
      return new Response(JSON.stringify({ error: 'Current academic year not found!' }), { status: 404 });
    }

    if (!currentAcademicTerm) {
        return new Response(JSON.stringify({ error: 'Current academic term not found!' }), { status: 404 });
      }

    const totalWards = await prisma.Students.count({
      where: {
        parentId
      },
    });

    const summary = {
      currentAcademicYear: currentAcademicYr.year,
      currentAcademicTerm: currentAcademicTerm.termName,
      totalWards,
    };

    return new Response(JSON.stringify(summary), { status: 200 });
  } catch (error) {
    console.error('Error fetching summary data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
