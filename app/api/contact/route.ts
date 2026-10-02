import nodemailer from "nodemailer";

const MAIL_USER = "hello@theunicorn.global";
const MAIL_APP_PASSWORD = "tpyhsxbbcfignozw";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_APP_PASSWORD,
  },
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      from: `"Website Contact Form" <${MAIL_USER}>`,
      to: [MAIL_USER, "dhruvi@theunicorn.global"],
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Contact form: ${subject.replace(/[\r\n]+/g, " ")}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return Response.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
