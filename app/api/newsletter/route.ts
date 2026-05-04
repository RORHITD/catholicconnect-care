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

  console.log("[newsletter] subscriber:", email);

  if (ct.includes("application/json")) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/?newsletter=ok", req.url), { status: 303 });
}
