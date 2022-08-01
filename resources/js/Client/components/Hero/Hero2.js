import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CarouselNav1Prev, CarouselNav1Next, CarouselNav1 } from '../Carousel/CarouselNav1'
// import './style.scss';

// import { Swiper, SwiperSlide } from "swiper/react";

// // import Swiper core and required modules
// import SwiperCore, {
//     Pagination, Navigation
// } from 'swiper/core';

// // install Swiper modules
// SwiperCore.use([Pagination, Navigation]);

import { Carousel } from 'react-responsive-carousel';
import { NumberFormat, PercentFormat } from '../Functions/NumberFormat';

const Hero2 = () => {

    const [heroData, setHeroData] = useState(false);
    useEffect(async () => {
        const dataFetch = await axios
            .get("/api/product?hero=true")
            .then(function (response) {
                // console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        if (JSON.stringify(dataFetch) != '{}') {
            setHeroData(dataFetch);
        }
    }, []);

    const [heroAsset, setHeroAsset] = useState(false);
    useEffect(async () => {
        const dataFetch = await axios
            .get("/js/data/HeroProduct.json")
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
            });

            setHeroAsset(dataFetch);

        // const loadCart = async () => {
        //     // setIsLoading(true);
        //     await dispatch(fetchCart());
        //     // setIsLoading(false);
        // };
        // loadCart();
    }, []);

    return (
        <section className="hero embed-responsive responsive-16by9">
            <div className="h-full">
                <div className="hero-background">
                    <div className="absolute w-full h-full object-cover" style={{ zIndex: '-1' }}>
                        <img className="w-full h-full object-cover"
                            src={ heroAsset?.asset || "/images/Products/DSCF0705.jpg"}
                        />
                    </div>
                </div>
                {heroData &&
                    <div className="hero-content h-full">
                        <div className="flex flex-col h-full justify-center">
                            <div className="content-container">
                                <a href={`/product/${heroData.slug}`}>
                                    <h2 className="title">{heroData.name}</h2>
                                </a>
                                {heroData.discount_price !== null ? (
                                    <>
                                        <h3 className="sub-title text-red-600 line-through inline-block align-middle">{NumberFormat(heroData.price, 'Rp.')}</h3>
                                        <span className="bg-gray-300 inline-block align-middle p-1 rounded ml-2">{PercentFormat(heroData.discount_price, heroData.price)}</span>
                                        <h3 className="sub-title">{NumberFormat(heroData.discount_price, 'Rp.')}</h3>
                                    </>
                                ) :
                                    <h3 className="sub-title">{heroData.money}</h3>
                                }
                                {/* <h3 className="sub-title text-red-600 line-through inline-block align-middle">Rp. 699.000</h3>
                                <span className="bg-gray-300 inline-block align-middle p-1 rounded ml-2">Disc 20%</span>
                                <h3 className="sub-title">Rp. 559.200</h3> */}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default Hero2;
