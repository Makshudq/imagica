import express from 'express'
import { generateImage } from '../controllers/imageController.js'
import { getUserIdmware } from '../middleWares/userIdmware.js'

const imageRouter = express.Router()

imageRouter.post('/generateImage',getUserIdmware, generateImage)

export default imageRouter