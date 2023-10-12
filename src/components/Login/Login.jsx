import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../Context/AuthContect';
import { Helmet } from 'react-helmet';

export default function Login() {

    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState('')
    let [loadingRes, setloadingRes] = useState(false)
    let { userIsloggedIn, setUserIsloggedIn } = useContext(AuthContext)
    useEffect(() => {
        console.log(userIsloggedIn)
        if (userIsloggedIn) {
            navigate("/home")
        }
    }, [])
    async function Login(values) {
        setErrorMessage("")
        setloadingRes(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
            // console.log(err.response.data.message)
            setErrorMessage(err.response.data.message)
            setloadingRes(false)
            // console.log(errorMessage)
        })
        if (data.message == "success") {
            setloadingRes(true)
            localStorage.setItem("token", data.token)
            // console.log(data.token)
            setUserIsloggedIn(true)
            navigate("/home")
        }



    }
    let validation = Yup.object({
        email: Yup.string().required("email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),
        password: Yup.string().required("password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must contain at least one number , special character , greater than 8 char and less than 16 char"),

    })
    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',


        },
        onSubmit: Login,
        validationSchema: validation,
    })
    // console.log(formik)
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="w-75 m-auto my-5">
                <h3>Login now</h3>
                <form className='mt-3' onSubmit={formik.handleSubmit}>

                    <label htmlFor="email">Email:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder='Email..' className='form-control mt-2 mb-4 ' id='email' name='email' />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
                    <label htmlFor="password">password:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" placeholder='Password..' className='form-control mt-2 mb-4 ' id='password' name='password' />
                    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

                    {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : null}

                    {loadingRes ? <button disabled type='button' className='btn bg-main text-white ms-auto d-block p-2 px-4 fw-bolder'> <i className='fas fa-spin fa-spinner'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white ms-auto d-block p-2 fw-bolder'>Login</button>}




                </form>
            </div>

        </>
    )
}
