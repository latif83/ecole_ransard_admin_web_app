// Import PrismaClient and bcrypt
import prisma from "@/config/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { studentIds, academicTermId, academicYrId } = await req.json();

    // Configure the email transport service (Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can replace this with your preferred email service
      auth: {
        user: "latifm8360@gmail.com", // Your email address
        pass: "rlhh qruk yvli tkil", // Your email password or an app password
      },
    });

    const academicYr = await prisma.AcademicYear.findFirst({
      where: {
        id: academicYrId,
      },
      include: {
        terms: {
          where: {
            id: academicTermId,
          },
        },
      },
    });

    // console.log(academicYr)

    studentIds.map(async (studentId) => {
      const student = await prisma.Students.findFirst({
        where: {
          id: studentId,
        },
        include: {
          // Include student-related billing details for the current academic term
          StudentFeeDetail: {
            where: {
              academicTermId: academicTermId,
            },
            include: {
              feeDetail: true,
            },
          },

          parents: true,
        },
      });

      // Format response to include billing details
      const result = {
        studentId: student.id,
        name: `${student.firstName} ${student.lastName}`,
        feeDetails: student.StudentFeeDetail.map((feeDetail) => ({
          feeTitle: feeDetail.feeDetail.title,
          feeAmount: feeDetail.amount,
        })),
        parentEmail: student.parents.email,
      };

      // Calculate total bill
      const totalBillAmount = result.feeDetails.reduce(
        (total, fee) => total + fee.feeAmount,
        0
      );

      // Prepare the detailed list of fees
      const feeDetailsHtml = result.feeDetails
        .map(
          (fee) =>
            `<tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 10px; border: 1px solid #ddd;"> ${
          fee.feeTitle
        } </td> 
        <td style="padding: 10px; text-align: right; border: 1px solid #ddd;"> GH₵ ${fee.feeAmount.toFixed(
          2
        )} </td> 
      </tr>`
        )
        .join("");

      const mailOptions = {
        from: '"Ronsard Ecole" <latifm8360@gmail.com>', // Sender address
        to: result.parentEmail, // Parent's email address
        subject: `New Bill for your ward ${
          result.name
        } - ${new Date().toLocaleTimeString()}`, // Subject line
        html: `<p>Dear Parent,</p>
<p>We would like to inform you that your ward, <b>${
          result.name
        }</b>, has now been billed for the <b>${
          academicYr.year
        }</b> academic year, ${academicYr.terms[0].termName} .</p>
<p>The bill details are as follows:</p>

<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
  <thead>
    <tr style="background-color: #f2f2f2; border-bottom: 2px solid #d9d9d9;">
      <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Item</th>
      <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Amount (GH₵)</th>
    </tr>
  </thead>
  <tbody>
    ${feeDetailsHtml}
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Total Bill Amount</td>
      <td style="padding: 10px; text-align: right; border: 1px solid #ddd; font-weight: bold;">GH₵ ${totalBillAmount.toFixed(
        2
      )}</td>
    </tr>
  </tbody>
</table>

<p>Please make the payment by the due date to avoid any penalties.</p>
<p>If you have any questions regarding the bill, feel free to contact the school's finance office.</p>
<p>Thank you for your attention to this matter.</p>
<p>Best regards,<br>School Administration</p>
`,
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);

    //   console.log("Email sent: %s", info.messageId);
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    NextResponse.json(
      { message: "Failed to send email." },
      {
        status: 500,
      }
    );
  }
}

