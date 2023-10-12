import React from 'react'
import NotFoundImg from "../../Assets/imges/error.webp"
export default function NotFound() {
    return (
        <>
            <div className="row d-flex justify-content-center " >
                <img src={NotFoundImg} className='img-fluid w-50' alt="" />
            </div>

        </>
    )
}
