import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let email: string | undefined;

  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    const body = (await req.json().catch(() => ({}))) as { email?: string };
    email = body.email;
  } else {
    const form = await req.formData();
    email = form.get("email")?.toString();
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  // No list provider is wired yet, so a subscription would otherwise vanish
  // into a log line. Forward it to the contact inbox through the same email
  // path the contact form uses; swap in a list provider here when one exists.
  const apiKey = process.env.CONTACT_EMAIL_API_KEY ?? process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM ?? process.env.RESEND_FROM_EMAIL ?? "noreply@catholicconnect.care";
  const to = process.env.CONTACT_RECIPIENT_EMAIL ?? "contact@catholicconnect.care";
  if (apiKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: "[CatholicConnect] Newsletter signup",
        text: `New newsletter subscriber: ${email}`,
      }),
    }).catch((e) => console.error("[newsletter] forward failed:", e));
  } else {
    console.log("[newsletter] subscriber (no email key set, not forwarded):", email);
  }

  if (ct.includes("application/json")) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/?newsletter=ok", req.url), { status: 303 });
}
