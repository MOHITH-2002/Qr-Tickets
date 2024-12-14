import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@qrtickets.software",
    to: email,
    subject: "Confirm your email",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="padding: 20px; text-align: center; background: #4CAF50; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to QR Tickets</h1>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
            <p style="font-size: 16px; line-height: 1.6;">Thank you for signing up. Please confirm your email address to start using our service.</p>
            <a href="${confirmLink}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 16px; font-weight: bold; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 4px;">Confirm Email</a>
            <p style="font-size: 14px; color: #777;">If you didn't create an account, you can safely ignore this email.</p>
          </div>
          <div style="padding: 10px; text-align: center; background: #f4f4f4; color: #777; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} QR Tickets. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@qrtickets.software",
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="padding: 20px; text-align: center; background: #FF5722; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Password Reset</h1>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
            <p style="font-size: 16px; line-height: 1.6;">We received a request to reset your password. Click the button below to proceed.</p>
            <a href="${resetLink}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 16px; font-weight: bold; color: white; background-color: #FF5722; text-decoration: none; border-radius: 4px;">Reset Password</a>
            <p style="font-size: 14px; color: #777;">If you didn't request this, you can safely ignore this email.</p>
          </div>
          <div style="padding: 10px; text-align: center; background: #f4f4f4; color: #777; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} QR Tickets. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  });
};
