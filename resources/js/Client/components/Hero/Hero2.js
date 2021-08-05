import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {CarouselNav1Prev,CarouselNav1Next,CarouselNav1} from '../Carousel/CarouselNav1'
// import './style.scss';

// import { Swiper, SwiperSlide } from "swiper/react";

// // import Swiper core and required modules
// import SwiperCore, {
//     Pagination, Navigation
// } from 'swiper/core';

// // install Swiper modules
// SwiperCore.use([Pagination, Navigation]);

import { Carousel } from 'react-responsive-carousel';

const Hero2 = () => {
    const heroData = [
        'Cy-Brightening Moisturizer Cream',
        'Cy-Brightening',
        'Package',
    ];

    return (
        <section className="hero hero-90">
            <div className="h-full">
                        <div className="hero-background">
                            <div className="absolute w-full h-full object-cover" style={{ zIndex: '-1' }}>
                                <img className="w-full h-full object-cover"
                                src="/images/Products/DSCF0705.jpg"
                                />
                            </div>
                        </div>
                            <div className="hero-content h-full">
                                <div className="flex flex-col h-full justify-center">
                                    <div className="content-container">
                                        <h2 className="title">"All is Calm <br/>All is Bright"<br/>Skin Care Set</h2>
                                        <h3 className="sub-title">Rp. 699.000</h3>
                                    </div>
                                </div>
                            </div>
                    </div>
        </section>
            )
}

            export default Hero2;
