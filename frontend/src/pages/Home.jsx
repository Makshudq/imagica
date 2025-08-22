import React, { useContext, useEffect } from 'react'
import { userContext } from '../App'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function Home() {
    const navigate = useNavigate()
    const { user, userImages, setUserImages } = useContext(userContext)
 
    //   const downloadImage = async () => {
    //   const imageUrl = imgurl;
    //   const response = await fetch(imageUrl);
    //   const blob = await response.blob();
    //   const url = window.URL.createObjectURL(blob);

    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = "myImage.png"; // filename
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   window.URL.revokeObjectURL(url);
    // };
    const downloadImg = () => { }

    const getallImages = async () => {
        const getToken = localStorage.getItem('token')
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/image/getAllImages`, {
            headers: {
                'Content-Type': 'application/json',
                token: getToken
            }
        })
        if (data.success) {
            console.log(data, 'getallImages data..............')
            setUserImages(data?.allUserImages) 
        }

       

    }

    console.log(userImages,'userImages')

    useEffect(() => {
       getallImages()
    }, [])
 
    return (
        <div className='container'>
            <div className='d-flex justify-content-end my-4'>
                <button className='btn btn-primary' onClick={() => navigate('/generateImage')}>Generate New images</button>
            </div>

            <div className='text-center mt-4'>
                <h2>Hello,{user.name}</h2>
            </div>

            <div className="text-center">
                <h3>Your generated images</h3>
                <div className="d-flex flex-wrap gap-4 justify-content-center mt-5">
                    {userImages?.map(image => {
                        return (<div className="imagesCards border rounded h-25 w-25 ">
                            <img src={image?.image} className='img-fluid rounded' alt="" style={{ filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))' }} />
                            <p className='m-2'><span className=''>Prompt:</span> <span className=''>{image?.prompt}</span></p>
                            <button className='btn btn-outline-secondary m-2' onClick={downloadImg} >Download</button>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    )
}
