import axios from "axios"
import { imageModel, userModel } from "../mongodb/model.js"
import FormData from "form-data"

const generateImage = async (req, res) => {
  try {
    const { userId, body: { prompt } } = req
    const userDate = await userModel.findById(userId)
    if (!userDate) {
      return res.status(400).json({ success: false, message: "User not found." })
    }
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Please provide prompt." })
    }
    if (userDate.coincount === 0) {
      return res.status(400).json({ success: false, message: "No more coins to generate images." })
    }

    const formData = new FormData()
    formData.append('prompt', prompt)

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      }
    )

    const base64Image = Buffer.from(data, 'binary').toString('base64')
    const resultImage = `data:image/png;base64,${base64Image}`

    await userModel.findByIdAndUpdate(userId, { coincount: userDate.coincount - 1 })

    res.status(200).json({
      success: true,
      message: 'image generated',
      coincount: userDate.coincount - 1,
      resultImage
    })
  } catch (error) {
    res.status(400).json({ success: false, message: `ImageController: ${error.message}` })
  }
}

const uploadImage = async (req, res) => {
  try {
    const { userId, body: { image, prompt } } = req
    if (!image) res.status(400).json({ success: false, message: "uploadImage: image not provided" })
    if (!prompt) res.status(400).json({ success: false, message: "uploadImage: prompt not provided" })

    await imageModel.create({ userId, image, prompt })

    res.status(200).json({ success: true, message: 'image uploaded successfully !!!', })

  } catch (error) {
    res.status(400).json({ success: false, message: `uploadImage: ${error.message}` })
  }
}

const getAllImages = async (req, res) => {

  try {
    const { userId } = req

  if (!userId) res.status(400).json({ success: false, message: `getAllImages: userId not found !!!` })

  const allUserImages = await imageModel.find({userId:userId})

  res.status(200).json({ success: true,allUserImages,  message: 'image uploaded successfully !!!', })

  console.log(allUserImages,'allUserImages')

  } catch (error) {
    res.status(400).json({ success: false, message: `getAllImages: ${error.message}` })
    
  }

}

export { generateImage, uploadImage, getAllImages }