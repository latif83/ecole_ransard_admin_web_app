import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { studentIds, academicTermId, feeDetails } = await req.json();

    // Validate required fields
    if (
      !studentIds ||
      !academicTermId ||
      !feeDetails ||
      !Array.isArray(feeDetails)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid parameters" },
        { status: 400 }
      );
    }

    // Track total amounts for each student
    const studentTotalAmounts = {};

    // Iterate over each student and fee detail to create or update StudentFeeDetail records
    for (const studentId of studentIds) {
      for (const fee of feeDetails) {
        let { feeTypeId, amount } = fee;
        amount = parseFloat(amount);

        // Check if a StudentFeeDetail record already exists for this student, fee, and term
        const existingFeeDetail = await prisma.StudentFeeDetail.findFirst({
          where: {
            studentId,
            feeDetailId: feeTypeId,
            academicTermId,
          },
        });

        if (existingFeeDetail) {
          // Update existing fee detail record
          await prisma.StudentFeeDetail.update({
            where: {
              id: existingFeeDetail.id,
            },
            data: {
              amount,
            },
          });

          // Track total amount for the student
        if (!studentTotalAmounts[studentId]) {
            studentTotalAmounts[studentId] = 0;
          }
          studentTotalAmounts[studentId] += (amount - existingFeeDetail.amount);
        } else {
          // Create new fee detail record
          await prisma.StudentFeeDetail.create({
            data: {
              studentId,
              feeDetailId: feeTypeId,
              academicTermId,
              amount,
            },
          });

          // Track total amount for the student
        if (!studentTotalAmounts[studentId]) {
            studentTotalAmounts[studentId] = 0;
          }
          studentTotalAmounts[studentId] += amount;
        }

        
      }
    }

    // Update or create StudentFeeSummary records
    for (const [studentId, totalAmountOwed] of Object.entries(
      studentTotalAmounts
    )) {
      const existingSummary = await prisma.StudentFeeSummary.findFirst({
        where: {
          studentId,
          academicTermId,
        },
      });

      if (existingSummary) {
        // Update existing summary by adding to the current totalAmountOwed
        await prisma.StudentFeeSummary.update({
          where: {
            id: existingSummary.id,
          },
          data: {
            totalAmountOwed: existingSummary.totalAmountOwed + totalAmountOwed,
          },
        });
      } else {
        // Create new summary
        await prisma.StudentFeeSummary.create({
          data: {
            studentId,
            academicTermId,
            totalAmountOwed,
            totalAmountPaid: 0, // Assuming no payments have been made yet
          },
        });
      }
    }

    // Return success response
    return NextResponse.json(
      { message: "Billing created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating billing and summaries:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
