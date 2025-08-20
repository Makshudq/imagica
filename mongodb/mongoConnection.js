import mongoose from "mongoose"

export const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Data base connected'))
    await mongoose.connect(process.env.MONGODB_URI)
}