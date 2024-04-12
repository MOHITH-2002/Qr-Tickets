"use server";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "../zodSchema";
import { connectToDb } from "../database/db";
import User from "../database/model/user";
import { generateVerificationToken } from "../token";
import { sendVerificationEmail } from "../Email/mail";
import { auth } from "@/auth";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    await connectToDb();
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const {email,name,password} = validatedFields.data;

  const existingUser = await User.findOne({email});
  if(existingUser) {
    return { error: "Email already exists!"}
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  
  await User.create({ email, name, password:hashedPassword });
  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Confirmation Email sent!" };
  } catch (error) {
    console.log(error);
    
  }
};

export const userInfo = async ()=>{
  const session = await auth();
  
  try {
    await connectToDb();
    const user = await User.findOne({ email:session?.user.email}).select('-password');
    return JSON.parse(JSON.stringify(user));
    
    
  } catch (error) {
    console.log(error);
    
  }
  
}