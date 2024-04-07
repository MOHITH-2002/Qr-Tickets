import PasswordResetToken from "../database/model/Password-reset-model";


export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await PasswordResetToken.findOne({ token });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await PasswordResetToken.findOne({ email });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};