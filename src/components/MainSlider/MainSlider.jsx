import React from 'react'
import Slider from "react-slick";
import slide1 from "../../Assets/imges/slider-image-1.jpeg"
import slide2 from "../../Assets/imges/slider-image-2.jpeg"
import slide3 from "../../Assets/imges/slider-image-3.jpeg"
import img1 from "../../Assets/imges/1.jpg"
import img2 from "../../Assets/imges/2.jpg"


export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            <div className="row mt-3">
                <div className="col-md-9 p-0" >
                    <div className="main-slider ">
                        <Slider {...settings}>

                            <img className='w-100' height={500} src={slide1} />
                            <img className='w-100' height={500} src={slide2} />
                            <img className='w-100' height={500} src={slide3} />

                        </Slider>
                    </div>
                </div>
                <div className="col-md-3 d-flex flex-column p-0">

                    <img src={img1} height={250} className='w-100' alt="" />
                    <img src={img2} height={250} className='w-100' alt="" />
                </div>
            </div>

        </>
    )
}
