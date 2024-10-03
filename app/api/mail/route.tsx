// app/api/sendEmail/route.ts
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { name, email, subject, message } = await req.json();  // Destructuring the request body

    // Create a transporter using your email service provider
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'paulkssa@gmail.com',  // Where you want to receive the messages
      subject: `New message from ${name}: ${subject}`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully', info }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
};
