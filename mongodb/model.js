import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name: {type: String, require:true, trim: true, },
email: {type: String, require:true, unique:true, trim: true, },
password:{type: String, require:true, trim: true, minlength: 4 },
coincount:{type:Number, default:10},
},
{timestamps:true});

const userModel = mongoose.model('userData', userSchema)

export default userModel