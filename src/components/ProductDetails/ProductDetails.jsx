import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { AuthContext } from '../../Context/AuthContect';

export default function ProductDetails() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    let { setUserIsloggedIn } = useContext(AuthContext)
    let navgateToLogIN = useNavigate()
    let params = useParams()
    let [productDetails, setProductDetails] = useState(null)
    let [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        getProductDetails(params.id)

    }, [])
    async function getProductDetails(productId) {
        setIsLoading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + productId)
        setIsLoading(false)
        setProductDetails(data.data)
        console.log(productDetails)
    }
    async function addProductToCart(productId) {

        let response = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.data.message)
            setUserIsloggedIn(false)
            localStorage.removeItem("token")
            navgateToLogIN("/login")
        })
        if (response) {
            toast.success(response.data.message)
        }

    }

    return (


        <>
            <Helmet>

                <title>{productDetails?.title}</title>
            </Helmet>
            {isLoading ? <div className="container d-flex justify-content-center align-items-center my-5 py-5"><span className="loader"></span></div> : <>
                <div className="container ">
                    <div className="row align-items-center py-5">
                        <div className="col-md-3">
                            <Slider {...settings}>
                                {productDetails?.images.map((img, index) => {
                                    return <img key={index} className='img-fluid' src={img} />
                                })}
                            </Slider>
                        </div >
                        <div className="col-md-9">
                            <h2>{productDetails?.title}</h2>
                            <h5 className='font-sm  text-main'>{productDetails?.category.name}</h5>
                            <p>{productDetails?.description}</p>
                            <p className='d-flex justify-content-between'>
                                <span>{productDetails?.price} EPG</span>
                                <span>
                                    <i className='fas fa-star rating-color pe-1'></i>
                                    {productDetails?.ratingsAverage}
                                </span>
                            </p>
                            <div className='d-flex justify-content-between'>
                                <button onClick={() => { addProductToCart(productDetails?.id) }} className='btn bg-main text-white w-75'> Add to Cart</button>
                                <i className='fas fa-heart haert '></i>
                            </div>

                        </div>
                    </div >
                </div >

            </>}
        </>

    )
}
