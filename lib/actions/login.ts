"use server";

import * as z from "zod";
import { AuthError } from "next-auth";


import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "../zodSchema";
import { signIn } from "@/auth";
import { generateVerificationToken } from "../token";
import User from "../database/model/user";
import { sendVerificationEmail } from "../Email/mail";
import { connectToDb } from "../database/db";

export const login = async (values: z.infer<typeof LoginSchema>) => {

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  await connectToDb();

  const { email, password } = validatedFields.data;
  const existingUser = await User.findOne({email});
  

  if (!existingUser || !existingUser.email || !existingUser.password) {
    // console.error('User not found or incomplete data:', existingUser);

    return { error: 'Email does not exist!' };
  }
  if (!existingUser.emailVerified) {
    // console.log('Email not verified. Sending verification...');
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Confirmation Email sent!' };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    console.log("success");
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
};