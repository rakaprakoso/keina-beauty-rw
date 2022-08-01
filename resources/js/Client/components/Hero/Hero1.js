import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CarouselNav1Prev, CarouselNav1Next, CarouselNav1 } from '../Carousel/CarouselNav1'
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';

const Hero1 = () => {
    const [heroData2, setHeroData2] = useState(false);
    useEffect(async () => {
        const dataFetch = await axios
            .get("/js/data/homeSlider.json")
            .then(function (response) {
                // console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                // console.log(error);
            });

        setHeroData2(dataFetch);

        // const loadCart = async () => {
        //     // setIsLoading(true);
        //     await dispatch(fetchCart());
        //     // setIsLoading(false);
        // };
        // loadCart();
    }, []);

    return (
        <section className="hero embed-responsive responsive-16by9">
            {heroData2 &&
                <Carousel
                    emulateTouch={true}
                    showStatus={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={1000*10}
                    showThumbs={false}
                    renderArrowPrev={CarouselNav1Prev}
                    renderArrowNext={CarouselNav1Next}
                >
                    {heroData2.map((item, i) => (
                        <div key={i} className="h-full">
                            <div className={`hero-background ${item.overlay ? "overlay" : ""}`}>
                                <div className="absolute w-full h-full object-cover" style={{ zIndex: '-1' }}>
                                    {item.type == 'video' &&
                                    <video
                                        autoPlay={true}
                                        loop={true}
                                        muted={true}
                                        src={item.asset}
                                    />
                                    }
                                    {item.type == 'image' &&
                                    <img src={item.asset} />
                                    }
                                </div>
                            </div>
                            {item.name &&
                            <div className="hero-content h-full">
                                <div className="flex flex-col h-full justify-center">
                                    <div className="content-container">
                                        <h2 className="title">{item.name}</h2>
                                        <h3 className="sub-title">Keina Product</h3>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    ))}
                </Carousel>
            }
        </section>
    )
}

export default Hero1;
