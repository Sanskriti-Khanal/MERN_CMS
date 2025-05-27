// nodemailer.js (ES Module version)
import dotenv from 'dotenv';
import nodemailer from "nodemailer";

dotenv.config();

// STMP (Simple Mail Transfer Protocol)
 const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;


