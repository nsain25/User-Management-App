import nodemailer from "nodemailer";

const SMTP_SERVERS: { [key: string]: string } = {
  "gmail.com": "smtp.gmail.com",
  "yahoo.com": "smtp.mail.yahoo.com",
  "yahoo.in": "smtp.mail.yahoo.com",
  "outlook.com": "smtp.office365.com",
  "hotmail.com": "smtp.office365.com",
  "zoho.com": "smtp.zoho.com",
  "icloud.com": "smtp.mail.me.com",
  "aol.com": "smtp.aol.com",
};

function getSmtpServer(email: string): string {
  const domain = email.split("@")[1]?.toLowerCase();
  return SMTP_SERVERS[domain] || "smtp.your-default-smtp.com";
}

const emailUser = process.env.EMAIL_USER!;
const emailPass = process.env.EMAIL_PASS!;
const smtpServer = getSmtpServer(emailUser);

const transporter = nodemailer.createTransport({
  host: smtpServer,
  port: 587, // Use 465 for SSL if needed
  secure: false, // True for 465, false for 587 (STARTTLS)
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `http://localhost:3000/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: `"Support Team" <${emailUser}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
      <p>Hello,</p>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  });
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Support Team" <${emailUser}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>Hello,</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  });
}

