import { NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function GET(req, { params }) {
  const { studentId } = params;

  if (!studentId) {
    return NextResponse.json(
      { message: "Student ID is required" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Get active academic term
    const activeTerm = await prisma.academicTerm.findFirst({
      where: {
        status: "Active",
      },
    });

    if (!activeTerm) {
      return NextResponse.json(
        { message: "No active academic term found" },
        { status: 400 }
      );
    }

    // Step 2: Fetch all unpaid fees for the student
    const unpaidFees = await prisma.studentFeeSummary.findMany({
      where: {
        studentId,
        academicTermId: {
          not: activeTerm.id,
        },
        totalAmountOwed: {
          gt: 0,
        },
      },
    });

    // Step 3: Separate previous billing (before current academic term)
    const previousBalance = unpaidFees.reduce(
      (sum, item) => sum + (item.totalAmountOwed - item.totalAmountPaid),
      0
    );

    const unpaidFeesCurrent = await prisma.studentFeeSummary.findFirst({
      where: {
        studentId,
        academicTermId: activeTerm.id,
        totalAmountOwed: {
          gt: 0,
        },
      },
    });

    const currentFeeDetails = await prisma.studentFeeDetail.findMany({
      where: {
        studentId: studentId,
        academicTermId: activeTerm.id,
      },
      include: {
        feeDetail: true,
      },
    });

    // Step 5: Prepare response with current billing and balance left
    const totalAmountPaid = unpaidFeesCurrent?.totalAmountPaid || 0;
    const totalAmountOwed = unpaidFeesCurrent?.totalAmountOwed || 0;
    const balanceLeft = (totalAmountOwed - totalAmountPaid) + previousBalance;

    return NextResponse.json(
      {
        previousBalance,
        currentBilling: {
            currentFeeDetails : currentFeeDetails.map((fees)=>({amount:fees.amount,fee:fees.feeDetail.title})),
          totalAmountPaid,
          balanceLeft,
          totalBill : totalAmountOwed
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching billing information:", error);
    return NextResponse.json({ message: "Server error" }, { status: 400 });
  }
}
