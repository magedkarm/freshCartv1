import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

export default function Home() {




    function getProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    let { data, isError, isFetched, isLoading, isFetching } = useQuery("products", getProducts, {

    })
    console.log(data?.data.data)

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className="container">
                <MainSlider />
                <CategoriesSlider />
                {isLoading ? <div className="container d-flex justify-content-center align-items-center my-5 py-5"><span className="loader"></span></div> :



                    <div className="row g-3 mt-3">
                        {data?.data.data.map((prod, i) => {
                            return <Product key={prod.id} prod={prod} />
                        })}
                    </div>
                }</div >
        </>

    )
}
