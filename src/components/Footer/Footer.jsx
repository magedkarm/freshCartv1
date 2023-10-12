import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className='bg-light py-5' >
                <div className="container">
                    <h4>Get the Fresh cart App</h4>
                    <p>We Will sen you a link , ioen it on your phone to download the app. </p>
                    <div className="row d-flex">
                        <div className="col-sm-10">
                            <input type="text" className='form-control py-2' placeholder='Email ..' />
                        </div>
                        <div className="col-sm-2">
                            <button className='btn text-white rounded-1 bg-main'>Share App link</button>
                        </div>
                    </div>
                    <div className='line border-bottom borde-2 my-4'></div>
                </div>
            </footer>

        </>
    )
}
