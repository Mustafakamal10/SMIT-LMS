import transporter from "../config/email.js";

const sendEmail = async ({ to, subject, html }) => {
  const fromEmail =
    process.env.SENDER_EMAIL ||
    process.env.EMAIL_FROM ||
    "murtazakamalkamalhussain@gmail.com";

  try {
    return await transporter.sendMail({
      from: `"Saylani Bootcamp LMS" <${fromEmail}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email send warning (safe fallback):", error.message);
    return { error: error.message };
  }
};

export default sendEmail;