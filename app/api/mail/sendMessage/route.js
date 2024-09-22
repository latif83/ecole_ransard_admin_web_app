// Import PrismaClient and bcrypt
import prisma from "@/config/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body
    const { message, parentEmail, parentName } = await req.json();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can change this to other email services
      auth: {
        user: "latifm8360@gmail.com", // Your email
        pass: "rlhh qruk yvli tkil", // Your email password or an app-specific password
      },
    });

    // Define the email options
    const mailOptions = {
      from: '"Ronsard Ecole" <latifm8360@gmail.com>', // Sender address
      to: parentEmail, // Parent's email address
      subject: `Message from School - ${new Date().toLocaleTimeString()}`, // Subject line
      html: `<p>Dear Parent, ( ${parentName} )</p>
             <p>${message}</p>
             <p>Best regards,<br>School Administration</p>`, // Email body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Log the message ID or other info
    console.log("Message sent: %s", info.messageId);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Error sending email" },
      { status: 500 }
    );
  }
}
