'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { NewPasswordSchema } from '../zodSchema';
import { getPasswordResetTokenByToken } from '../data/password-reset-token';
import User from '../database/model/user';
import PasswordResetToken from '../database/model/Password-reset-model';


export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await User.findOne({email: existingToken.email});

  if (!existingUser) {
    return { error: "Email does not exist!" }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await User.updateOne({ _id: existingUser._id }, { $set: { password: hashedPassword } });

  await PasswordResetToken.deleteOne({ id: existingToken.id });

    return { success: "Password updated!" };
};