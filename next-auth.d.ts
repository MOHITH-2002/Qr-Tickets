import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  country: "argentina" | "uruguay" | "brasil" | "colombia";
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  isTwoFactorEnabled?: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}