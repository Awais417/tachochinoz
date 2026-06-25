import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactFormData {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    reasonOfContact: string;
    message: string;
}

export async function POST(request: NextRequest) {
    if (!process.env.RESEND_API_KEY) {
        return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const body: ContactFormData = await request.json();

        const { fullName, phoneNumber, emailAddress, reasonOfContact, message } =
            body;

        // Validation
        if (!fullName || !emailAddress || !message) {
            return NextResponse.json(
                { error: "Full name, email address, and message are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Contact Form <onboarding@resend.dev>",
            to: process.env.CONTACT_TO_EMAIL || "your-email@example.com",
            replyTo: emailAddress,
            subject: `New Contact: ${reasonOfContact || "General Inquiry"}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #B71C1C; border-bottom: 2px solid #B71C1C; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; width: 160px; vertical-align: top;">Full Name</td>
              <td style="padding: 10px; color: #555;">${escapeHtml(fullName)}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Phone Number</td>
              <td style="padding: 10px; color: #555;">${escapeHtml(phoneNumber || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Email Address</td>
              <td style="padding: 10px; color: #555;">
                <a href="mailto:${escapeHtml(emailAddress)}" style="color: #B71C1C;">${escapeHtml(emailAddress)}</a>
              </td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Reason of Contact</td>
              <td style="padding: 10px; color: #555;">${escapeHtml(reasonOfContact || "Not specified")}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Message</td>
              <td style="padding: 10px; color: #555; white-space: pre-wrap;">${escapeHtml(message)}</td>
            </tr>
          </table>
        </div>
      `,
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json(
                { error: "Failed to send email. Please try again later." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, messageId: data?.id },
            { status: 200 }
        );
    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}

function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
}