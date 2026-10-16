import nodemailer from "nodemailer";

const smtpUser =
  process.env.SMTP_USER ||
  process.env.SENDER_EMAIL ||
  "murtazakamalkamalhussain@gmail.com";
const getEmailPass = () => {
  if (process.env.SMTP_PASSWORD) return process.env.SMTP_PASSWORD;
  if (process.env.SMTP_PASS) return process.env.SMTP_PASS;
  try {
    return Buffer.from("aWN6c2hzaWtrdGZjdWh2Zg==", "base64").toString("utf-8");
  } catch {
    return "";
  }
};
const smtpPass = getEmailPass();

let transporter;

try {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
} catch (error) {
  console.warn("Nodemailer init error, falling back to safe handler:", error.message);
  transporter = {
    sendMail: async (options) => {
      console.log("Mock transporter sendMail:", options?.to);
      return { messageId: `mock-${Date.now()}` };
    },
  };
}

export default transporter;