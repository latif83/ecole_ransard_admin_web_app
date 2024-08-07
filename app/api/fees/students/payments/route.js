import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { studentId, amount, paymentMethod } = await req.json();

    // Validate required fields
    if (!studentId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing or invalid parameters" },
        { status: 400 }
      );
    }

    // Get the current academic term ID
    const currentAcademicTerm = await prisma.AcademicTerm.findFirst({
      where: { status: "Active" },
    });

    const currentAcademicTermId = currentAcademicTerm.id;

    // Get all outstanding debts for the student
    const outstandingDebts = await prisma.StudentFeeSummary.findMany({
      where: {
        studentId,
        OR: [
          { academicTermId: { in: [currentAcademicTermId] } },
          { academicTermId: { not: currentAcademicTermId } }
        ],
      },
      orderBy: {
        academicTerm: {
          createdAt: 'asc', // Order by oldest term first
        },
      },
    });

    // Calculate the total outstanding amount
    let totalOutstandingAmount = outstandingDebts.reduce((sum, summary) => {
      return sum + (summary.totalAmountOwed - summary.totalAmountPaid);
    }, 0);

    let remainingAmount = amount;

    // Distribute the payment
    for (const debt of outstandingDebts) {
      if (remainingAmount <= 0) break;

      const amountOwed = debt.totalAmountOwed - debt.totalAmountPaid;
      const amountToPay = Math.min(remainingAmount, amountOwed);

      // Update the StudentFeeSummary
      await prisma.StudentFeeSummary.update({
        where: {
          id: debt.id,
        },
        data: {
          totalAmountPaid: debt.totalAmountPaid + amountToPay,
        },
      });

      remainingAmount -= amountToPay;
    }

    // Create a Payment record
    await prisma.Payment.create({
      data: {
        studentId,
        amount: amount - remainingAmount, // Amount actually paid
        paymentMethod,
      },
    });

    // Return success response
    return NextResponse.json(
      { message: "Payment processed successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
