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
    html: `# Final step...

Follow this link to verify your email address.

<a href="${confirmLink} target="_blank" style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Confirm now</a>

If you didn't ask to verify this address, you can ignore this email.

Thanks,
Team Qr-Tickets`
  });
};


export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "mail@qrtickets.software",
    to: email,
    subject: "Reset your password",
    html: `# Trouble signing in?

We've received a request to reset the password for this user account.

<a href="${resetLink}" target="_blank" style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Reset your password</a>

If you didn't ask to reset your password, you can ignore this email.

Thanks,
Team Qr-Tickets`
  });
};

// export const sendTicketToEmail = async (
//   email: string,
//   token: string,
// ) => {
//   await resend.emails.send({
//     from: "mail@qrtickets.software",
//     to: email,
//     subject: "Reset your password",
    
//   });
// };