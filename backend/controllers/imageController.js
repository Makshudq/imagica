import axios from "axios"
import { imageModel, userModel } from "../mongodb/model.js"
import FormData from "form-data"

const generateImage = async (req, res) => {

  try {
    const { userId, body: { prompt } } = req
    console.log(req, 'userId.........')
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
    if (!image || !prompt) res.status(400).json({ success: false, message: "uploadImage: image/prompt not provided" })

    await imageModel.create({
      userId, image, prompt
    })
    res.status(200).json({ success: true, message: 'image uploaded successfully !!!', })

  } catch (error) {

    res.status(400).json({ success: false, message: `uploadImage: ${error.message}` })
  }
}

export { generateImage, uploadImage }