import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../Context/AuthContect';

export default function Register() {

    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState('')
    let [loadingRes, setloadingRes] = useState(false)
    let { userIsloggedIn, setUserIsloggedIn } = useContext(AuthContext)
    useEffect(() => {
        if (userIsloggedIn) {
            navigate("/home")
        }
    }, [])

    async function Register(values) {
        setErrorMessage("")
        setloadingRes(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err) => {
            // console.log(err.response.data.message)
            setErrorMessage(err.response.data.message)
            setloadingRes(false)
            // console.log(errorMessage)
        })
        if (data.message == "success") {
            setloadingRes(true)
            navigate("/login")
        }
        setloadingRes(false)


    }
    let validation = Yup.object({
        name: Yup.string().required("Name is required").min(3, "min lenght is 3 char").max(20, "max lenght is 20 char"),
        email: Yup.string().required("email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),
        password: Yup.string().required("password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must contain at least one number , special character , greater than 8 char and less than 16 char"),
        rePassword: Yup.string().required("Re-Password is required").oneOf([Yup.ref("password")], "not match password"),
        phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Enter valid Egyption phone number")
    })
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',

        },
        onSubmit: Register,
        validationSchema: validation,
    })
    // console.log(formik)
    return (
        <>
            <div className="w-75 m-auto my-5">
                <h3>Register now</h3>
                <form className='mt-3' onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" placeholder='Name..' className='form-control mt-2 mb-4 ' id='name' name='name' />
                    {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}
                    <label htmlFor="email">Email:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder='Email..' className='form-control mt-2 mb-4 ' id='email' name='email' />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
                    <label htmlFor="password">password:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" placeholder='Password..' className='form-control mt-2 mb-4 ' id='password' name='password' />
                    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}
                    <label htmlFor="rePassword">Re-Password:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" placeholder='Re-password..' className='form-control mt-2 mb-4 ' id='rePassword' name='rePassword' />
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null}
                    <label htmlFor="phone">Phone:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" placeholder='phone..' className='form-control mt-2 mb-4 ' id='phone' name='phone' />
                    {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}

                    {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : null}

                    {loadingRes ? <button disabled type='button' className='btn bg-main text-white ms-auto d-block p-2 px-4 fw-bolder'> <i className='fas fa-spin fa-spinner'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white ms-auto d-block p-2 fw-bolder'>Register Now</button>}




                </form>
            </div>

        </>
    )
}
