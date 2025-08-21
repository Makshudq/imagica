import express from "express"
import "dotenv/config"
import userRouter from "./Routes/userRouter.js"
import imageRouter from "./Routes/imageRouter.js"
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/image', imageRouter)

app.listen(process.env.PORT, () => {
    console.log(`server running on port: ${process.env.PORT}`)
}) 

 