import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";



export default function CategoriesSlider() {
    const [categories, setCategories] = useState([]);
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        arrows: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3
    };

    useEffect((() => {
        getCategories()
    }), [])

    async function getCategories() {

        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        // console.log(data.data)
        setCategories(data.data)

    }
    return (
        <>

            <Slider {...settings} className='mt-4'>

                {categories.map((cat, index) => {
                    return (
                        <div key={cat._id} className='catSlider'>
                            <img src={cat.image} className='w-100' height={300} alt="" />
                        </div>
                    )
                })}

            </Slider>




        </>
    )
}
