import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Await } from 'react-router-dom';
import Product from '../Product/Product';

export default function Products() {
    let productIdArr = []
    function getProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    let { data, isLoading } = useQuery("products", getProducts, {

    })


    return (
        <>
            <Helmet>
                <title>Products</title>
            </Helmet>
            <div className="container">


                {isLoading ? <div className="container d-flex justify-content-center align-items-center my-5 py-5"><span className="loader"></span></div> :



                    <div className="row g-3 mt-3">
                        {data?.data.data.map((prod, i) => {
                            productIdArr.push(prod.id)
                            return <Product key={prod.id} prod={prod} />
                        })}







                    </div>
                }
            </div>


        </>
    )
}
