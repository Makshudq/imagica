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

  const imageUpload = async () => {
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
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', margin: 'auto', padding: '1rem', marginTop: '2rem' }}>
        <div style={{ border: '1px solid gray', borderRadius: '8px', height: '450px', width: '450px' }}>
          {image ? <img src={image} alt="image" style={{ height: '450px', borderRadius: '.5rem', boxShadow: '0,0,08,gray' }} />
            : <p className='m-2'>No image, please generate new.</p>}
        </div>
        <div className='w-25'>
          <input type="text" style={{ border: '1px solid gray', borderRadius: '.5rem', padding: '.3rem', width: '100%', margin: '1rem 0' }} placeholder='Provide your prompt' onChange={(e) => setPrompt(e.target.value)} />

          <button className='btn btn-primary w-100' onClick={generateImageHandler}>Generate Image</button>

          {image && (
            <div className='d-flex'>
              <button className='btn btn-success w-100 m-2' onClick={downloadImage}>
                Download Image
              </button>
              <button className='btn btn-secondary w-100 m-2' onClick={imageUpload}>
                Upload Image
              </button>
              <button className='btn btn-secondary w-100 m-2' onClick={getallImages}>
                getallImages Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div >
  )
}
