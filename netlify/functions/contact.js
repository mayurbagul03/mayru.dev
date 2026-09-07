const nodemailer = require("nodemailer");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed." }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body." }) };
  }

  const { name, email, subject, message } = payload;

  if (!name || !email || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: "Name, email and message are required." }) };
  }
  if (!isValidEmail(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Please provide a valid email address." }) };
  }
  if (String(message).length > 5000) {
    return { statusCode: 400, body: JSON.stringify({ error: "Message is too long." }) };
  }

  const entry = {
    name: String(name).trim(),
    email: String(email).trim(),
    subject: subject ? String(subject).trim() : "(no subject)",
    message: String(message).trim(),
  };

  const transporter = getTransporter();
  if (!transporter) {
    console.error("Contact form: SMTP is not configured.");
    return { statusCode: 500, body: JSON.stringify({ error: "Could not send message right now. Please try emailing directly." }) };
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
      replyTo: entry.email,
      subject: `[Portfolio] ${entry.subject}`,
      text: `From: ${entry.name} <${entry.email}>\n\n${entry.message}`,
    });
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error("Contact form error:", err.message);
    return { statusCode: 500, body: JSON.stringify({ error: "Could not send message right now. Please try emailing directly." }) };
  }
};
