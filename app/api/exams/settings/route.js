import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const gradeSettings = await prisma.GradeSetting.findMany({
      orderBy: { minScore: "asc" },
    });

    return NextResponse.json(gradeSettings, { status: 200 });
  } catch (error) {
    console.error("Error fetching grade settings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    let { grade, minScore, maxScore, comment } = await req.json();

    minScore = Number(minScore);

    maxScore = Number(maxScore);

    const newGradeSetting = await prisma.GradeSetting.create({
      data: { grade, minScore, maxScore, comment },
    });

    return NextResponse.json(
      { message: "Grade created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating grade setting:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, grade, minScore, maxScore, comment } = await req.json();

    const updatedGradeSetting = await prisma.gradeSetting.update({
      where: { id },
      data: { grade, minScore, maxScore, comment },
    });

    return NextResponse.json(updatedGradeSetting, { status: 200 });
  } catch (error) {
    console.error("Error updating grade setting:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await prisma.gradeSetting.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Grade setting deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting grade setting:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
