'use server';

import { getVerificationTokenByToken } from "../data/verification-token";

import User from "../database/model/user";
import VerificationToken from "../database/model/verification-model";


export const newVerification = async (token: string) => {
  const existingToken: any = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
    return { error: "Token has expired!" };
    }
  const existingUser: any = await User.findOne({email:existingToken.email});

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await User.updateOne({ _id: existingUser._id }, { $set: { emailVerified: new Date(), email: existingToken.email } });

  await VerificationToken.deleteOne({ id: existingToken.id });

    return { success: "Email verified!" };
};