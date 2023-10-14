import axios from "axios";
import { createContext, useEffect, useState } from "react";




export let CountCart = createContext()

export default function CountCartProvider({ children }) {
    let [countNumber, setcountNumber] = useState()

    useEffect(() => {

        getLoggedUserCart()
    }, [setcountNumber])
    async function getLoggedUserCart() {
        let response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: localStorage.getItem('token')
            }
        }
        )

        if (response) {
            setcountNumber(response.data.data.products.length)
            console.log(countNumber)
        }
    }


    return <CountCart.Provider value={{ countNumber, setcountNumber }}>
        {children}
    </CountCart.Provider>
}