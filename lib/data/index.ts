// import { connectToDb } from "../database/db";
// import User from "../database/model/user";

// export const getUserByEmail =async (email: string)=>{
//     try {
//         await connectToDb();
//         const user = await User.findOne({email});
//         return user;
//     } catch (error) {
//         return null;
//     }
// }