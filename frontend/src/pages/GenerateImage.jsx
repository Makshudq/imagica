import React, { useState } from 'react'
import axios from 'axios'

export default function GenerateImage() {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState("")
  console.log(prompt, 'prompt')

  const generateImageHandler = async () => {
    const getToken = localStorage.getItem('token')
    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/image/generateImage`, { prompt }, {
      headers: {
        'Content-Type': 'application/json',
        token: getToken
      }
    })
    if (data.success) {
      setImage(data.resultImage)
    }
    console.log(data, 'image_data...')
  }
  const imageUploaded = async () => {
    const getToken = localStorage.getItem('token')
    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/image/uploadImage`, { prompt, image }, {
      headers: {
        'Content-Type': 'application/json',
        token: getToken
      }
    })
    if (data.success) {
      alert('IMage uploaded successfully to DB')
    }
    console.log(data, 'Uploaded image_data...')
  }


  const downloadImage = () => {
    if (!image) return
    const link = document.createElement("a")
    link.href = image
    link.download = "generated-image.png" // name of the file
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40vw', margin: 'auto', padding: '1rem', marginTop: '2rem' }}>
        <div style={{
          height: '350px',
          border: '1px solid gray',
          width: '100%',
          borderRadius: '8px'
        }}>
         {image? <img src={image} alt="image" style={{ height: '450px', borderRadius: '.5rem', boxShadow: '0,0,08,gray' }} /> 
         : <p>No image, please generate new.</p>} 
        </div>

        <input type="text" style={{ border: '1px solid gray', borderRadius: '.5rem', padding: '.3rem', width: '100%', margin: '1rem 0' }} placeholder='Provide your prompt' onChange={(e) => setPrompt(e.target.value)} />

        <button className='btn btn-primary w-100' onClick={generateImageHandler}>Generate Image</button>

        {image && (
          <>
            <button className='btn btn-success w-100 mt-2' onClick={downloadImage}>
              Download Image
            </button>
            <button className='btn btn-secondary w-100 mt-2' onClick={imageUploaded}>
              Upload Image
            </button>
          </>
        )}
      </div>
    </div >
  )
}
