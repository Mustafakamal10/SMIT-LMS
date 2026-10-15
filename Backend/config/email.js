import nodemailer from "nodemailer";

const smtpUser = process.env.SMTP_USER || process.env.SMTP_USERNAME;
const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

let transporter;

if (smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.sendgrid.net",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
} else {
  // Safe fallback transporter to prevent "Missing credentials for PLAIN" crash
  transporter = {
    sendMail: async (options) => {
      console.log("⚠️ Email delivery mock (SMTP not configured):", options.to);
      return { messageId: `mock-${Date.now()}` };
    },
  };
}

export default transporter;