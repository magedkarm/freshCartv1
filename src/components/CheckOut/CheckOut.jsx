import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

export default function CheckOut() {
    let { cartId } = useParams()
    console.log(cartId)
    async function checkOut(shippingAddress) {
        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress
        }, {
            headers: { token: localStorage.getItem("token") }
        })
        console.log(res.data.session.url)
        window.location.href = res.data.session.url
    }

    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',


        },
        onSubmit: checkOut,

    })
    return (
        <>
            <Helmet>
                <title>Check Out</title>
            </Helmet>
            <form className='w-75 m-auto mt-3 mb-5' onSubmit={formik.handleSubmit}>

                <label htmlFor="details">Details:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" placeholder='details..' className='form-control mt-2 mb-4 ' id='details' name='details' />
                <label htmlFor="phone">Phone:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" placeholder='phone..' className='form-control mt-2 mb-4 ' id='phone' name='phone' />
                <label htmlFor="city">city:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" placeholder='city..' className='form-control mt-2 mb-4 ' id='city' name='city' />



                <button type='submit' className='btn bg-main text-white ms-auto d-block p-2 fw-bolder'>Order </button>



            </form>
        </>
    )
}
