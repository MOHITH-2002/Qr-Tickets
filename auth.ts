import NextAuth from "next-auth"

import authConfig from "@/auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import User from "@/lib/database/model/user";
import { connectToDb } from "./lib/database/db";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  
    callbacks:{
      


      async signIn({ user, account}:any) {

        

        // if (account?.provider !== "credentials") return true;

        
        // Prevent sign in without email verification
        
        if (account?.provider === "google") {
          
          
          await connectToDb();
          try {
            
            
            const existingUser= await User.findOne({ email: user.email});
            
          if(existingUser?.emailVerified === null) return false;
          

                
                
            
          if (!existingUser) {
            const newUser = new User({
            
            name: user.name,
            email: user.email,
            image: user.image || "",
            emailVerified: new Date(),
            
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    
    return true;
  },

      async session({ session, user, token }) {
        
      return session
    },
    async jwt({ token }) {
      return token
      
    }

    },
    secret: process.env.AUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: "jwt" },
  ...authConfig,
});