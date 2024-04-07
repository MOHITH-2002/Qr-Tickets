'use server';

import * as z from 'zod';
import { ResetSchema } from '../zodSchema';
import User from '../database/model/user';
import { generatePasswordResetToken } from '../token';
import { sendPasswordResetEmail } from '../Email/mail';



export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await User.findOne({email});

  if (!existingUser) {
       return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Reset email sent!" };
};