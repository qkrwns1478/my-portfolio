import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const { name, email, message, token } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "모든 필드를 입력해주세요." }, { status: 400 });
  }

  const suspicious = /<script|<iframe|onerror|onload|data:|javascript:/i;
  if (suspicious.test(name) || suspicious.test(email) || suspicious.test(message)) {
    return NextResponse.json({ error: "악성 콘텐츠가 감지되었습니다." }, { status: 400 });
  }

  try {
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const params = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY!,
      response: token,
    });
    const verifyRes = await fetch(verifyUrl, {
      method: "POST",
      body: params,
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json({ error: "reCAPTCHA 인증 실패" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${escapeHtml(name)}" <${process.env.CONTACT_EMAIL}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: `[포트폴리오 문의] ${escapeHtml(name)}`,
      html: `
        <p><strong>보낸 사람:</strong> ${escapeHtml(name)} (${email})</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("메일 전송 실패:", err);
    return NextResponse.json({ error: "메일 전송에 실패했습니다." }, { status: 500 });
  }
}