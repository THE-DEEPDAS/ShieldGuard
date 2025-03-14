import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationEmail = async (email, firstName, verificationLink) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Verify your E-mail",
      html: `
        <div style="text-align: center;">
          <p style="margin: 20px;"> Hi ${firstName}, Please click the button below to verify your E-mail. </p>
          <a href="${verificationLink}">
            <button style="background-color: black; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 10px 0; cursor: pointer;">Verify Email</button>
          </a>
        </div>`,
    };

    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw error;
  }
};

export { sendVerificationEmail };
