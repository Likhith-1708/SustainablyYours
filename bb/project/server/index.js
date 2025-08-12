import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

let otpStore = {}; // Store OTP and expiry per email

// Route to send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // expires in 5 min
  };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
});

// Route to verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!otpStore[email])
    return res.status(400).json({ message: "OTP not found. Please request again." });

  const { otp: storedOtp, expiresAt } = otpStore[email];
  if (Date.now() > expiresAt)
    return res.status(400).json({ message: "OTP expired. Please request again." });

  if (parseInt(otp) === storedOtp) {
    delete otpStore[email];
    return res.json({ success: true, message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
