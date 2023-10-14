import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Brand from '../Brand/Brand'
import { Helmet } from 'react-helmet'

export default function Brands() {
    function getBarnds() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }
    let { data, isLoading } = useQuery("Brands", getBarnds, {

    })
    console.log(data?.data.data)
    return (
        <>

            <Helmet>
                <title>Brands</title>
            </Helmet>
            <>
                <div className="container mt-5 text-center mb-4">


                    {isLoading ? <div className="container d-flex justify-content-center align-items-center my-5 py-5"><span className="loader"></span></div> :


                        <>
                            <h1 className='pt-5 text-main fw-bolder'>All Brands</h1>
                            <div className="row g-3 mt-5">
                                {data?.data.data.map((brand) => {
                                    return <Brand key={brand._id} brand={brand} />
                                })}
                            </div>
                        </>
                    }
                </div>
            </>
        </>
    )
}
