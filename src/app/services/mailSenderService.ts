import nodemailer from "nodemailer";

export async function sendEmail(email: string, htmlContentToSend: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Confirm your registration",
    html: htmlContentToSend,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent: ", info.response);
  } catch (error) {
    console.error("Error while sending mail: ", error);
  }
}
