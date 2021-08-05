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

const Hero1 = () => {
    const heroData = [
        'Cy-Brightening Moisturizer Cream',
        'Cy-Brightening',
        'Package',
    ];

    return (
        <section className="hero hero-90">
            {/* <Swiper
                slidesPerView={1}
                loop={true}
                navigation={true}
                pagination={{
                    "dynamicBullets": true
                }}
                slidesOffsetAfter={0}
                slidesOffsetBefore={0}
                spaceBetween={0}
                className="h-full"
                >
                    {heroData.map((item, i) => (
                        <SwiperSlide
                        className="w-screen flex items-center"
                        >
                            <div className="hero-background">
                                <video
                                    autoPlay={true}
                                    loop={true}
                                    muted={true}
                                    src="\assets\video\tutorial-jkt-3.mp4"
                                />
                            </div>
                            <div className="hero-content">
                                <div className="content-container">
                                    <h2 className="title">{item}</h2>
                                    <h3 className="sub-title">Skin Care Keina</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper> */}
            {/* <div className="section-wrapper w-full"><div className="container-fluid"><div className="row"><div className="col-md-5 mt-20"><h1 className="text-5xl font-bold mb-3">Raka D Prakoso</h1><p className="text-lg mb-4">Want to know more about me ?</p><a className="bg-primary-100 px-3 py-2 text-lg font-semibold rounded-lg text-gray-50 shadow-lg inline">Get to Know<svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" className="ml-5 inline" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z" /></svg></a></div></div></div></div> */}
            {/* <Carousel className="h-full">
                {heroData.map((item, i) => (
                    <div
                        className=""
                    >
                        <div className="hero-background">
                            <video
                                autoPlay={true}
                                loop={true}
                                muted={true}
                                src="\assets\video\tutorial-jkt-3.mp4"
                            />
                        </div>
                        <div className="hero-content">
                            <div className="content-container">
                                <h2 className="title">{item}</h2>
                                <h3 className="sub-title">Skin Care Keina</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel> */}
            {/* <Swiper slidesPerView={1} spaceBetween={0} loop={true} pagination={{
                "clickable": true
            }} navigation={true}
            freeMode={true}
            setWrapperSize={false}

            className="mySwiper"> */}
            <Carousel

            emulateTouch={true}
            showStatus={false}
            autoPlay={false}
            infiniteLoop={true}
            internal={1000000}
            showThumbs={false}

            renderArrowPrev={CarouselNav1Prev}
            renderArrowNext={CarouselNav1Next}
            >
                {heroData.map((item, i) => (
                    <div className="h-full">
                        <div className="hero-background overlay">
                            <div className="absolute w-full h-full object-cover" style={{ zIndex: '-1' }}>
                                <video
                                    autoPlay={true}
                                    loop={true}
                                    muted={true}
                                    src="/assets\video\tutorial-jkt-3.mp4"
                                />
                            </div>
                        </div>
                            <div className="hero-content h-full">
                                <div className="flex flex-col h-full justify-center">
                                    <div className="content-container">
                                        <h2 className="title">{item}</h2>
                                        <h3 className="sub-title">Skin Care Keina</h3>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
                </Carousel>
            {/* </Swiper> */ }
        </section>
            )
}

            export default Hero1;
