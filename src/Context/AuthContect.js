import { createContext, useEffect, useState } from "react";




export let AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    let [userIsloggedIn, setUserIsloggedIn] = useState(localStorage.getItem("token") ? true : false)

    useEffect(() => {



        if (localStorage.getItem("token") != null) {
            setUserIsloggedIn(true)
        }
    }, [])

    return <AuthContext.Provider value={{ userIsloggedIn, setUserIsloggedIn }}>
        {children}
    </AuthContext.Provider>
}