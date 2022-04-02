import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    CarouselNav1Prev,
    CarouselNav1Next,
    CarouselNav1,
} from "../Carousel/CarouselNav1";

import { Carousel } from "react-responsive-carousel";
import { NumberFormat, PercentFormat } from "../Functions/NumberFormat";

const Hero3 = ({imgBackground}) => {
    return (
        <section className="hero">
            <div className="h-full">
                <div className="hero-background overflow-hidden">
                    <div
                        className="absolute w-full h-full object-cover"
                        style={{ zIndex: "-1" }}
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={imgBackground ? imgBackground : "/images/Products/DSCF0705.jpg"}
                            style={{filter: 'blur(10px)'}}
                        />
                    </div>
                </div>
                <div className="hero-content h-full">
                    <div className="flex flex-col h-full justify-center">
                        <div className="content-container h-80">
                            {/* <a href={`/product/asdasd`}>
                                <h2 className="title">AVASDS</h2>
                            </a>
                            <>
                                <h3 className="sub-title text-red-600 line-through inline-block align-middle">
                                    TESTT
                                </h3>
                                <span className="bg-gray-300 inline-block align-middle p-1 rounded ml-2">{PercentFormat(heroData.discount_price, heroData.price)}</span>
                                <h3 className="sub-title">{NumberFormat(heroData.discount_price, 'Rp.')}</h3>
                            </> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero3;
