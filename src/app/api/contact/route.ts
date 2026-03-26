import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators/contact";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendNotificationEmail, sendAutoReplyEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Send both emails, wait for completion (avoid fire-and-forget on Vercel)
    await Promise.allSettled([
      sendNotificationEmail(data).catch((err) =>
        console.error("Notification email failed:", err)
      ),
      sendAutoReplyEmail(data).catch((err) =>
        console.error("Auto-reply email failed:", err)
      ),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
