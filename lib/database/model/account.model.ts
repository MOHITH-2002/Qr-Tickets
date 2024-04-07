import mongoose, { Schema } from 'mongoose';
// import { v4 as uuidv4 } from "uuid";

const accountSchema = new Schema({
  // id: { type: String, default: uuidv4() },
  userId: { type: String, ref: 'User' },
  type: String,
  provider: { type: String, unique: true },
  providerAccountId: { type: String, unique: true },
  refresh_token: { type: String, select: false },
  access_token: { type: String, select: false },
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: { type: String, select: false },
  session_state: String,
});

const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);

export default Account;