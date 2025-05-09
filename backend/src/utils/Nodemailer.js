import nodemailer from "nodemailer";

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL || "default_email@gmail.com",
    pass: process.env.SMTP_PASS || "default_password",
  },
});

const Sendmail = async (email, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: subject,
      html: message,
    };

    await emailTransporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

export { Sendmail, emailTransporter };
