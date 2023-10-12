import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContect'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    let { userIsloggedIn } = useContext(AuthContext)
    if (userIsloggedIn) {
        return children

    }
    else {
        return <Navigate to={"/login"} />
    }

}
