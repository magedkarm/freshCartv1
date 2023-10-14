import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContect'
import axios from 'axios'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
export default function ForgetPassword() {

    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState('')
    let [loadingRes, setloadingRes] = useState(false)



    async function sendCode(values) {
        setErrorMessage("")
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values).catch((err) => {
            // console.log(err.response.data.message)
            setErrorMessage(err.response.data.message)
            setloadingRes(false)
        })
        console.log(data)
        if (data.message == "Reset code sent to your email") {
            setloadingRes(true)
            navigate("/verify-Code")
        }



    }
    let validation = Yup.object({
        email: Yup.string().required("email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),


    })
    let formik = useFormik({
        initialValues: {
            email: '',



        },
        validationSchema: validation,
        onSubmit: sendCode,

    })


    return (
        <>
            <Helmet>
                <title>Reset</title>
            </Helmet>
            <div className="w-75 m-auto my-5">
                <h3>please enter your Email:</h3>
                <form className='mt-3' onSubmit={formik.handleSubmit}>


                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder='Email..' className='form-control mt-2 mb-4 ' id='email' name='email' />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}


                    {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : null}

                    <div className='d-flex'>

                        {loadingRes ? <button disabled type='button' className='btn bg-main text-white ms-auto d-block p-2 px-4 fw-bolder'> <i className='fas fa-spin fa-spinner'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white ms-auto d-block p-2 fw-bolder'>Send</button>}
                    </div>




                </form>
            </div>

        </>
    )
}
