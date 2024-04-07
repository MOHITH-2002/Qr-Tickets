import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from './data/verification-token';
import VerificationToken from './database/model/verification-model';
import PasswordResetToken from './database/model/Password-reset-model';
import { getPasswordResetTokenByEmail } from './data/password-reset-token';


export const generateVerificationToken = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      await VerificationToken.deleteOne({ id: existingToken.id });
    }

    const verificationToken = await VerificationToken.create({
      email,
      token,
      expires,
    });

    return verificationToken;
  } catch (error) {
    console.error('Error generating verification token:', error);
    throw new Error('Failed to generate verification token');
  }
};

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
      await PasswordResetToken.deleteOne({ id: existingToken.id });
    }

    const newPasswordResetToken = await PasswordResetToken.create({
      email,
      token,
      expires,
    });

    return newPasswordResetToken;
  } catch (error) {

    throw new Error('Failed to generate verification token');
  }
};