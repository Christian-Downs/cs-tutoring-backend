import nodemailer from "nodemailer";

export default async function handler(req, res) {
    console.log("mailing");
  if (req.method === "POST") {
    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
      },
    });

    try {
      await transporter.sendMail({
        from: email,
        to: "christian.downs.15@gmail.com", // Your email address to receive messages
        subject: `Contact Form: ${subject}`,
        text: message,
      });

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
