import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Waitlist, { WAITLIST_SOURCES, type WaitlistSource } from "@/models/Waitlist";
import nodemailer from "nodemailer";

// GET: return total waitlist count
export async function GET() {
  try {
    await connectDB();
    const count = await Waitlist.countDocuments();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Waitlist GET error:", error);
    return NextResponse.json({ error: "Failed to fetch count" }, { status: 500 });
  }
}

// POST: add new email to waitlist + send confirmation email
export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const resolvedSource: WaitlistSource = WAITLIST_SOURCES.includes(source)
      ? source
      : "sdk";

    await connectDB();

    const existing = await Waitlist.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 }
      );
    }

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const entry = await Waitlist.create({
      email: email.toLowerCase(),
      ipAddress,
      source: resolvedSource,
    });

    const count = await Waitlist.countDocuments();

    // Send confirmation email via Nodemailer
    await sendConfirmationEmail(email, count);

    return NextResponse.json(
      {
        success: true,
        message: "You're on the waitlist!",
        position: count,
        id: entry._id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Waitlist POST error:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}

async function sendConfirmationEmail(email: string, position: number) {
  const host = process.env.EMAIL_HOST;
  const port = parseInt(process.env.EMAIL_PORT || "587");
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const from = process.env.EMAIL_FROM || user;

  if (!host || !user || !pass) {
    console.warn("Email credentials not configured — skipping confirmation email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"SOLAI" <${from}>`,
    to: email,
    subject: "You're on the SOLAI SDK early access list",
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8" /></head>
        <body style="margin:0;padding:0;background:#FAFAF9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF9;padding:48px 24px;">
            <tr>
              <td align="center">
                <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #E7E5E4;border-radius:16px;padding:48px 40px;">
                  <tr>
                    <td>
                      <p style="margin:0 0 32px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#2E6B12;font-weight:600;">SOLAI SDK</p>
                      <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;color:#0A0A0A;line-height:1.2;">You're on the list.</h1>
                      <p style="margin:0 0 32px;font-size:16px;color:#52525B;line-height:1.6;">
                        You're <strong style="color:#0A0A0A;">#${position}</strong> in line for early access to the SOLAI SDK —
                        non-custodial DeFi agents on Solana, bounded by guardrails your users set.
                        When the private beta opens we'll send you the docs and your private npm tag.
                      </p>
                      <div style="background:#FAFAF9;border:1px solid #E7E5E4;border-radius:12px;padding:20px 24px;margin-bottom:32px;">
                        <p style="margin:0 0 8px;font-size:12px;color:#A1A1AA;text-transform:uppercase;letter-spacing:0.1em;">Your position</p>
                        <p style="margin:0;font-size:32px;font-weight:700;color:#0A0A0A;">#${position}</p>
                      </div>
                      <p style="margin:0 0 8px;font-size:14px;color:#52525B;line-height:1.6;">
                        In the meantime, the SOLAI Wallet — the reference app built on this SDK — is live on the Chrome Web Store.
                      </p>
                      <p style="margin:24px 0 0;font-size:13px;color:#A1A1AA;">
                        SOLAI · Non-custodial DeFi agents on Solana
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
}
