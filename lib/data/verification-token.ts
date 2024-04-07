import VerificationToken from "../database/model/verification-model";


export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await VerificationToken.findOne({ token });

    return verificationToken;
  } catch (error) {
    return null;
  }
};
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await VerificationToken.findOne({ email });

    return verificationToken;
  } catch {
    return null;
  }
};