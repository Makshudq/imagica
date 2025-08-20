import axios from "axios"
import userModel from "../mongodb/model.js"
import FormData from "form-data"

export const generateImage = async (req, res) => {
  try {
    const { userId, body: { prompt } } = req

    const userDate = await userModel.findById(userId)
    if (!userDate || !prompt) {
      return res.status(400).json({ status: false, message: "User/prompt not found !!!." })
    }
    if (userDate.coincount === 0) {
      return res.status(400).json({ status: false, message: "No more coins to generate images." })
    }

    const formData = new FormData()
    formData.append('prompt', prompt)

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders() // 🔥 important!
        },
        responseType: 'arraybuffer'
      }
    )

    const base64Image = Buffer.from(data, 'binary').toString('base64')
    const resultImage = `data:image/png;base64,${base64Image}`

    await userModel.findByIdAndUpdate(userId, { coincount: userDate.coincount - 1 })

    res.status(200).json({
      status: true,
      message: 'image generated',
      coincount: userDate.coincount - 1,
      resultImage
    })
  } catch (error) {
    res.status(400).json({ status: false, message: `ImageController: ${error.message}` })
  }
}
