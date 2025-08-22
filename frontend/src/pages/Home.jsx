import React, { useContext } from 'react'
import { userContext } from '../App'

export default function Home() {
    const { user } = useContext(userContext)
    console.log(user)
    return (
        <div>
            <div className='text-center mt-4'>
                <h2>Hello,{user.name}</h2>
            </div>
            <div className="container text-center">
                <h3>Your generated images</h3>
                <div className="imagesgrid d-flex">
                    <div className="imagesCards border rounded h-25 w-25 ">
                        <img src="/car-mg.png" className='img-fluid' alt="" style={{filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))'}} />
                       <p className='m-2'><span className=''>Prompt:</span> <span className=''>Indian car mg</span></p>
                        <button className='btn btn-outline-secondary m-2'>Download</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
