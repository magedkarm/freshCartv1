import axios from 'axios'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContect'

export default function Product({ prod }) {

    let navgateToLogIN = useNavigate()
    let { setUserIsloggedIn } = useContext(AuthContext)
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

    async function addProductToWishList(productId) {

        let response = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
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
        <div className="col-md-3 pointer" >

            <div className="product px-2 py-3 overflow-hidden" >
                <NavLink to={"/productDetails/" + prod.id}>
                    < img className='w-100 mb-2' src={prod.imageCover} alt="" />
                    <h6 className='font-sm text-main'>{prod?.category?.name}</h6>
                    <h5>{prod?.title?.split(" ").slice(0, 2).join(" ")}</h5>
                    <div className="d-flex justify-content-between">
                        <p className='' >{prod?.price} EGP</p>
                        <span><i className='fas fa-star rating-color pe-1'></i>
                            {prod?.ratingsAverage}</span>
                    </div>

                </NavLink>

                <div className='d-flex justify-content-between'>
                    <button onClick={() => { addProductToCart(prod?.id) }} className='btn bg-main text-white'>Add to Cart</button>
                    <i onClick={() => { addProductToWishList(prod?.id) }} className='fas fa-heart fa-2x ms-5 '></i>
                </div>
            </div>



        </div >

    )
}
