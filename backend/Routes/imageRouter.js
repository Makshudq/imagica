import express from 'express'
import { generateImage, getAllImages, uploadImage } from '../controllers/imageController.js'
import { getUserIdmware } from '../middleWares/userIdmware.js'

const imageRouter = express.Router()

imageRouter.post('/generateImage',getUserIdmware, generateImage)
imageRouter.post('/uploadImage',getUserIdmware, uploadImage)
imageRouter.get('/getAllImages',getUserIdmware, getAllImages)

export default imageRouter