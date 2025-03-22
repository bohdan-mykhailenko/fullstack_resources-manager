import { APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";

import nodemailer from "nodemailer";

import { ConfirmEmailInput } from "./interfaces";

const UI_URL = secret("UI_URL")();
const EMAIL_FROM = secret("EMAIL_FROM")();
const GMAIL_APP_PASSWORD = secret("GMAIL_APP_PASSWORD")();

const generateEmailHtml = (firstName: string, confirmationLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Confirmation</title>
</head>
<body>
  <div>
    <h2>Confirm Your Email Address</h2>
    <p>Hello ${firstName},</p>
    <p>Thank you for signing up! To complete your registration, please confirm your email address by clicking the link below:</p>
    <p>
      <a href="${confirmationLink}">Confirm Email</a>
    </p>
    <p>Alternatively, you can copy and paste the following link into your browser:</p>
    <p>${confirmationLink}</p>
    <p>This link will expire in 8 hours.</p>
    <p>If you did not create an account, please ignore this email.</p>
    <p>Best regards,<br>Your Application Team</p>
    <hr>
    <p>This is an automated message. Please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const sendConfirmationEmail = async ({
  firstName,
  email,
  confirmationToken,
}: ConfirmEmailInput) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_FROM,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  transporter
    .sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: "Confirm your email",
      html: generateEmailHtml(
        firstName,
        `${UI_URL}/confirm-email/${confirmationToken}`
      ),
    })
    .catch((error) => {
      throw APIError.internal("Failed to send confirmation email");
    });
};
