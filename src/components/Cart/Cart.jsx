import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContect'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { CountCart } from '../../Context/CountCart'

export default function Cart() {

    let [errorMessage, setErrorMessage] = useState("")
    let [totalPrice, setTotalPrice] = useState("")
    let [cartId, setCartId] = useState("")
    let [cartProduct, setCartProduct] = useState([])
    let [reqTimeOut, setReqTimeOut] = useState([])
    let { countNumber, setcountNumber } = useContext(CountCart)
    let [isLoading, setIsLoading] = useState(false)
    useEffect(() => {

        getLoggedUserCart()
    }, [])
    async function getLoggedUserCart() {
        setIsLoading(true)
        let response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
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
            setCartId(response.data.data._id)
            setTotalPrice(response.data.data.totalCartPrice)
            setCartProduct(response.data.data.products)
            // setcountNumber(response.data.data.products.length)
            console.log(countNumber)
        }
    }


    async function removeItemFromCart(productId) {
        setIsLoading(true)

        let removedItem = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setIsLoading(false)
        if (removedItem) {
            setTotalPrice(removedItem.data.data.totalCartPrice)
            setCartProduct(removedItem.data.data.products)
        }
    }

    async function removeAllItemFromCart() {
        setIsLoading(true)
        let removedItem = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setIsLoading(false)
        if (removedItem) {
            setTotalPrice(0)
            setCartProduct([])
            setErrorMessage("error")
        }
    }

    function updateCart(productId, count, index) {
        let res
        let newProducts = [...cartProduct]
        newProducts[index].count = count
        setCartProduct(newProducts)

        clearTimeout(reqTimeOut)
        setReqTimeOut(setTimeout(async () => {
            res = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
                count
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            if (res) {
                setTotalPrice(res.data.data.totalCartPrice)
                setCartProduct(res.data.data.products)
            }
        }, 500))



    }


    return (

        <>
            <Helmet>
                <title>Cart</title>
            </Helmet>


            {isLoading ? <div className="container d-flex justify-content-center align-items-center my-5 py-5"><span className="loader"></span></div> : <>
                {cartProduct.length == 0 ? <h2 className='alert alert-warning  text-center m-5'>Add Some Products Bro</h2> :
                    <>
                        <div className='bg-light p-4 mt-3'>
                            <div className='d-flex justify-content-between'>
                                <h2 className='text-main fw-bolder'>Your Cart</h2>
                                <button onClick={removeAllItemFromCart} className='btn btn-danger'>Clear Cart</button>

                            </div>
                            {cartProduct.map((products, index) => {
                                return <div key={products.product._id} className="cart-product">

                                    <div className="row border-bottom my-3 pb-2 d-flex align-items-center">
                                        <div className="col-md-2">
                                            <img src={products?.product.imageCover} className='img-fluid' alt="" />
                                        </div>
                                        <div className="col-md-8 d-flex justify-content-between mb-2">
                                            <div className="div">
                                                <h3>{products?.product.title}</h3>
                                                <h5>price : {products?.price} EGP</h5>
                                                <h5>Total price : {products?.price * products.count} EGP</h5>
                                                <button onClick={() => {
                                                    removeItemFromCart(products.product._id)
                                                }} className="btn btn-sm m-0 p-0 text-danger"><i className="fa fa-trash"></i> Remove</button>
                                            </div>



                                        </div>
                                        <div className="col-md-2 mt-sm-4 ">
                                            <button onClick={() => { updateCart(products.product._id, products.count + 1, index) }} className="btn bg-main mx-2 text-white">+</button>
                                            <span>{products?.count}</span>
                                            <button onClick={() => { updateCart(products.product._id, products.count - 1, index) }} className="btn bg-main mx-2 text-white">-</button>
                                        </div>
                                    </div>


                                </div>
                            })}
                            <div className='d-flex justify-content-between'>
                                <h4 className='text-main fw-bold border border-danger-subtle  '> Total price: {totalPrice}</h4>
                                <Link to={"/checkout/" + cartId} className='btn bg-main text-white '>Check Out</Link>
                            </div>
                        </div>

                    </>}

            </>}
        </>

    )
}
