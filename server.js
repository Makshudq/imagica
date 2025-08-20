import express from "express"
import "dotenv/config"
import userRouter from "./Routes/userRouter.js"
import imageRouter from "./Routes/imageRouter.js"


const app = express()
app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/image', imageRouter)

app.listen(process.env.PORT, () => {
    console.log(`server running on port: ${process.env.PORT}`)
}) 

 