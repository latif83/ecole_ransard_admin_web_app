import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      // Parse the request body
      const { name, description, classSessionId, subjectId, weight, marks } = await req.json();
  
      // Validate required fields
      if (!name || !classSessionId || !subjectId || !weight || !marks) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
  
      // Retrieve the active academic term
      const activeAcademicTerm = await prisma.academicTerm.findFirst({
        where: {
          status: 'Active',
        },
      });
  
      if (!activeAcademicTerm) {
        return NextResponse.json(
          { error: 'No active academic term found' },
          { status: 404 }
        );
      }
  
      const academicTermId = activeAcademicTerm.id;
  
      // Fetch existing assessments for the same subject and class session in the active academic term
      const existingAssessments = await prisma.assessments.findMany({
        where: {
          academicTermId,
          subjectId,
          classSessionId,
        },
      });
  
      // Calculate the total weight of existing assessments
      const totalWeight = existingAssessments.reduce((sum, assessment) => sum + parseFloat(assessment.weight), 0);
  
      // Validate that the total weight with the new assessment does not exceed 100%
      if (totalWeight + weight > 100) {
        return NextResponse.json(
          { error: 'Total weight of assessments exceeds 100%' },
          { status: 400 }
        );
      }
  
      // Create the new assessment
      const newAssessment = await prisma.assessments.create({
        data: {
          name,
          description,
          academicTermId,
          classSessionId,
          subjectId,
          weight,
          marks,
        },
      });
  
      // Return the newly created assessment
      return NextResponse.json(
        { message: 'Assessment created successfully' },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating assessment:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }

export async function GET(req) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get("subjectId");
    const classSectionId = searchParams.get("classSectionId");

    // Validate parameters
    if (!subjectId || !classSectionId) {
      return NextResponse.json(
        { error: 'Missing required query parameters: subjectId or classSectionId' },
        { status: 400 }
      );
    }

    // Fetch the active academic term
    const activeAcademicTerm = await prisma.academicYear.findFirst({
      where: { status: 'Active' },
      include: { terms: true },
    });

    if (!activeAcademicTerm || !activeAcademicTerm.terms.length) {
      return NextResponse.json(
        { error: 'No active academic term found' },
        { status: 404 }
      );
    }

    const activeTerm = activeAcademicTerm.terms.find(term => term.status === 'Active');

    if (!activeTerm) {
      return NextResponse.json(
        { error: 'No active academic term found' },
        { status: 404 }
      );
    }

    // Retrieve assessments for the active academic term, subject, and class section
    const assessments = await prisma.assessments.findMany({
      where: {
        academicTermId: activeTerm.id,
        subjectId: subjectId,
        classSessionId: classSectionId,
      },
      include: {
        subject: true,
      },
    });

    // Return the assessments
    return NextResponse.json(
      assessments.map((assessment) => ({
        id: assessment.id,
        name: assessment.name,
        description: assessment.description,
        weight: assessment.weight,
        marks: assessment.marks,
        createdAt: assessment.createdAt,
        updatedAt: assessment.updatedAt,
        subject: {
          id: assessment.subject.id,
          name: assessment.subject.name,
        }
      })),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving assessments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


