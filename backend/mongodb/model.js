import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, trim: true, },
        email: { type: String, require: true, unique: true, trim: true, },
        password: { type: String, require: true, trim: true, minlength: 4 },
        coincount: { type: Number, default: 10 },
    },
    { timestamps: true }
);

const userModel = mongoose.model('userData', userSchema)


const imageSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "userData", require: true, unique: false },
        prompt: { type: String, require: true },
        image: { type: String, require: true }
    },
    { timestamps: true }
)

const imageModel = mongoose.model("userImages", imageSchema)


export { userModel, imageModel }