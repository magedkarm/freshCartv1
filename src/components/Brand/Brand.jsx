import React from 'react'

export default function Brand({ brand }) {
    return (
        <>
            <div className="col-md-3 pointer " >

                <div className="card  overflow-hidden" >
                    <div className="">
                        <img src={brand.image} className='img-fluid ' alt="" />
                    </div>

                    <div className="card-body">
                        <h4 className='text-center text-main fa-sm'>{brand.name}</h4>
                    </div>






                </div>



            </div >

        </>
    )
}
