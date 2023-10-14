import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContect'

export default function WishList() {

    let [isLoading, setIsLoading] = useState(false)
    let [errorMessage, setErrorMessage] = useState("")
    let [wishList, setWishList] = useState([])
    let navgateToLogIN = useNavigate()
    let { setUserIsloggedIn } = useContext(AuthContext)

    useEffect(() => {

        getLoggedUserwishList()
    }, [])

    async function getLoggedUserwishList() {
        setIsLoading(true)
        let response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                token: localStorage.getItem('token')
            }
        }
        ).catch((err) => {
            console.log(err)
            setErrorMessage(err.response.data.message)


        })
        setIsLoading(false)

        if (response) {
            console.log(response.data.data)
            setWishList(response.data.data)
        }
    }


    async function removeItemFromWishList(productId) {
        setIsLoading(true)

        let removedItem = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setIsLoading(false)
        if (removedItem) {
            console.log(removedItem)
            getLoggedUserwishList()
        }
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
                <title>Wish List</title>
            </Helmet>


            {isLoading ? <div className="container d-flex justify-content-center align-items-center my-5 py-5"><span className="loader"></span></div> : <>
                {wishList.length == 0 ? <h2 className='alert alert-warning  text-center m-5'>Add Some Products Bro</h2> :
                    <>
                        <div className='bg-light p-4 mt-3'>
                            <div className='d-flex justify-content-between'>
                                <h2 className='text-main fw-bolder'>Your Wish List</h2>


                            </div>
                            {wishList.map((products, index) => {
                                return <div key={products._id} className="cart-product">

                                    <div className="row border-bottom my-3 pb-2 d-flex align-items-center">
                                        <div className="col-md-2">
                                            <img src={products?.imageCover} className='img-fluid' alt="" />
                                        </div>
                                        <div className="col-md-8 d-flex justify-content-between mb-2">
                                            <div className="div">
                                                <h5>{products?.title}</h5>
                                                <h5>price : {products?.price} EGP</h5>

                                                <button onClick={() => {
                                                    removeItemFromWishList(products.id)
                                                }} className="btn btn-sm m-0 p-0 text-danger"><i className="fa fa-trash"></i> Remove</button>
                                            </div>



                                        </div>
                                        <div className="col-md-2 mt-sm-4 ">
                                            <button onClick={() => { addProductToCart(products.id) }} className="btn bg-main mx-2 text-white">Add to Cart</button>

                                        </div>
                                    </div>


                                </div>
                            })}
                            {/* <div className='d-flex justify-content-between'>
                                <h4 className='text-main fw-bold border border-danger-subtle  '> Total price: {totalPrice}</h4>
                                <Link to={"/checkout/" + cartId} className='btn bg-main text-white '>Check Out</Link>
                            </div> */}
                        </div>

                    </>}

            </>}
        </>
    )
}
