import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface CateringFormData {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    company: string;
    desiredSpaceVenue: string;
    eventType: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    numberOfPeople: string;
    budgetRange: string;
    dietaryRestrictions: string[];
    cateringStyle: string;
    barService: string;
    additionalNotes: string;
}

const REQUIRED_FIELDS: (keyof CateringFormData)[] = [
    "email",
    "firstName",
    "lastName",
    "phoneNumber",
    "company",
    "desiredSpaceVenue",
    "eventType",
    "eventDate",
    "startTime",
    "endTime",
    "numberOfPeople",
    "budgetRange",
    "cateringStyle",
    "barService",
];

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

function formatTime(time: string): string {
    if (!time) return "Not provided";
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
}

function formatDate(date: string): string {
    if (!date) return "Not provided";
    const d = new Date(date + "T00:00:00");
    return d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function buildRow(
    label: string,
    value: string,
    isAlt: boolean,
    isLink?: boolean
): string {
    const bgStyle = isAlt ? 'style="background-color: #f9f9f9;"' : "";
    const valueHtml = isLink
        ? `<a href="mailto:${escapeHtml(value)}" style="color: #B71C1C; text-decoration: none;">${escapeHtml(value)}</a>`
        : escapeHtml(value);

    return `
    <tr ${bgStyle}>
      <td style="padding: 12px 16px; font-weight: bold; color: #333; width: 180px; vertical-align: top; border-bottom: 1px solid #eee;">${label}</td>
      <td style="padding: 12px 16px; color: #555; border-bottom: 1px solid #eee;">${valueHtml}</td>
    </tr>
  `;
}

export async function POST(request: NextRequest) {
    try {
        const body: CateringFormData = await request.json();

        // Validate required fields
        const missing = REQUIRED_FIELDS.filter((field) => {
            const val = body[field];
            return !val || (typeof val === "string" && val.trim() === "");
        });

        if (missing.length > 0) {
            return NextResponse.json(
                {
                    error: `Missing required fields: ${missing.join(", ")}`,
                },
                { status: 400 }
            );
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        // Validate numberOfPeople is a positive number
        const numPeople = parseInt(body.numberOfPeople, 10);
        if (isNaN(numPeople) || numPeople < 1) {
            return NextResponse.json(
                { error: "Number of people must be at least 1." },
                { status: 400 }
            );
        }

        // Validate event date is not in the past
        const eventDate = new Date(body.eventDate + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (eventDate < today) {
            return NextResponse.json(
                { error: "Event date cannot be in the past." },
                { status: 400 }
            );
        }

        const dietary =
            body.dietaryRestrictions.length > 0
                ? body.dietaryRestrictions.join(", ")
                : "None specified";

        let rowIndex = 0;
        const rows = [
            buildRow("Name", `${body.firstName} ${body.lastName}`, rowIndex++ % 2 === 1),
            buildRow("Email", body.email, rowIndex++ % 2 === 1, true),
            buildRow("Phone", body.phoneNumber, rowIndex++ % 2 === 1),
            buildRow("Company", body.company, rowIndex++ % 2 === 1),
            buildRow("Venue", body.desiredSpaceVenue, rowIndex++ % 2 === 1),
            buildRow("Event Type", body.eventType, rowIndex++ % 2 === 1),
            buildRow("Event Date", formatDate(body.eventDate), rowIndex++ % 2 === 1),
            buildRow("Time", `${formatTime(body.startTime)} – ${formatTime(body.endTime)}`, rowIndex++ % 2 === 1),
            buildRow("Guests", `${body.numberOfPeople} people`, rowIndex++ % 2 === 1),
            buildRow("Budget", body.budgetRange, rowIndex++ % 2 === 1),
            buildRow("Catering Style", body.cateringStyle, rowIndex++ % 2 === 1),
            buildRow("Bar Service", body.barService, rowIndex++ % 2 === 1),
            buildRow("Dietary Needs", dietary, rowIndex++ % 2 === 1),
            buildRow("Additional Notes", body.additionalNotes || "None", rowIndex++ % 2 === 1),
        ].join("");

        const htmlEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto;">
        <div style="background-color: #B71C1C; padding: 24px 30px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Catering Booking Request</h1>
          <p style="color: #ffcdd2; margin: 6px 0 0; font-size: 14px;">
            Submitted on ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div style="border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse;">
            ${rows}
          </table>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 16px; text-align: center;">
          This booking was submitted via the website catering form.
        </p>
      </div>
    `;

        // Send email to the business
        const { data, error } = await resend.emails.send({
            from:
                process.env.RESEND_FROM_EMAIL ||
                "Catering Bookings <onboarding@resend.dev>",
            to: process.env.CATERING_TO_EMAIL || "catering@example.com",
            replyTo: body.email,
            subject: `Catering Booking: ${body.eventType} – ${formatDate(body.eventDate)} (${body.numberOfPeople} guests)`,
            html: htmlEmail,
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json(
                { error: "Failed to send booking request. Please try again later." },
                { status: 500 }
            );
        }

        // Send confirmation email to the customer
        try {
            await resend.emails.send({
                from:
                    process.env.RESEND_FROM_EMAIL ||
                    "Catering Bookings <onboarding@resend.dev>",
                to: body.email,
                subject: "We received your catering booking request!",
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
            <h2 style="color: #B71C1C;">Thank you, ${escapeHtml(body.firstName)}!</h2>
            <p style="color: #555; line-height: 1.6;">
              We've received your catering booking request for
              <strong>${escapeHtml(body.eventType)}</strong> on
              <strong>${formatDate(body.eventDate)}</strong> for
              <strong>${escapeHtml(body.numberOfPeople)} guests</strong>.
            </p>
            <p style="color: #555; line-height: 1.6;">
              Our team will review your request and get back to you within 24 hours.
              If you have any urgent questions, feel free to reply to this email.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #999; font-size: 13px;">
              This is an automated confirmation. Please do not reply unless you need to make changes to your request.
            </p>
          </div>
        `,
            });
        } catch (confirmErr) {
            // Don't fail the whole request if confirmation email fails
            console.error("Confirmation email error:", confirmErr);
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