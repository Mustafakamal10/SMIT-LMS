import nodemailer from "nodemailer";

const smtpUser =
  process.env.SMTP_USER ||
  process.env.SENDER_EMAIL ||
  "murtazakamalkamalhussain@gmail.com";
const smtpPass =
  process.env.SMTP_PASSWORD ||
  process.env.SMTP_PASS ||
  "iczshsikktfcuhvf";

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