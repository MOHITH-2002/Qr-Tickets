import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
    type: String,
    required: true,
    unique: true,
    },
    name: {
    type: String,
    required: true,
    },
    password:{
        type:String,
    },
    image:{type:String},
    emailVerified: {
        type:Date,
        default:null
        
    },createdAt: {
		type: Date,
		default: Date.now,
	},

});

export default mongoose.models?.User || mongoose.model("User", userSchema);

// export default User;