import React from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'

export default function Category({ cat }) {



    return (
        <>
            <div className="col-md-4 pointer " >

                <div className="card px-2 py-3 overflow-hidden" >
                    <div className="card-img">
                        <img src={cat.image} className='img-fluid ratio-4x3 w-100' alt="" />
                    </div>

                    <div className="card-body">
                        <h4 className='text-center text-main'>{cat.name}</h4>
                    </div>






                </div>



            </div >

        </>
    )
}
