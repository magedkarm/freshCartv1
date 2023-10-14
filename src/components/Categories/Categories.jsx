import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import Category from '../Category/Category'

export default function Categories() {
    function getCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    let { data, isLoading } = useQuery("Categories", getCategories, {

    })
    console.log(data?.data.data)
    return (
        <>

            <Helmet>
                <title>Categories</title>
            </Helmet>
            <>
                <div className="container my-5 pt-5">


                    {isLoading ? <div className="container d-flex justify-content-center align-items-center my-5 py-5"><span className="loader"></span></div> :



                        <div className="row g-3 mt-3">
                            {data?.data.data.map((cat) => {
                                return <Category key={cat._id} cat={cat} />
                            })}
                        </div>
                    }
                </div>
            </>
        </>
    )
}
