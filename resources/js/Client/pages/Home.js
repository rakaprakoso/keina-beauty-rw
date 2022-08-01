import { React, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import {
    CarouselNav1Next,
    CarouselNav1Prev,
} from "../components/Carousel/CarouselNav1";
import Hero1 from "../components/Hero/Hero1";
import Page from "../page";

function Home(props) {
    const folderData = "/storage/assets/testi/";
    const totalData = 36;
    var data = ["a1.jpg", "a2.jpg", "a3.jpg", "a4.jpg", "a5.jpg"];
    for (let i = 1; i <= totalData; i++) {
        data.push(`testi (${i}).jpg`);
    }
    const [testiData, setTestiData] = useState(data);
    var productData = [
        "/storage/assets/1.jpeg",
        "/storage/assets/2.jpeg",
        "/storage/assets/3.jpeg",
        "/storage/assets/4.jpeg",
    ];

    return (
        <>
            <Hero1 />
            <section className="page-wrapper py-12">
                <div className="text-center mb-6">
                    <h3 className="title text-4xl">Keina Product</h3>
                </div>
                <div className="row">
                    {productData.map((item, i) => (
                        <div key={i} className="col-lg-6 mb-8">
                            <img className="rounded-xl" src={item} />
                        </div>
                    ))}
                </div>
            </section>
            <section className="page-wrapper py-12">
                <div className="row">
                    <div className="col-lg-5 flex justify-center items-center">
                        <h3 className="title text-4xl text-right py-3 px-5 bg-primary text-white rounded-full mb-5 lg:mb-0">Testimonial</h3>
                    </div>
                    <div className="col-lg-7 flex-grow flex-row">
                        {testiData && (
                            <Carousel
                                emulateTouch={true}
                                showStatus={false}
                                autoPlay={true}
                                infiniteLoop={true}
                                interval={3000}
                                showIndicators={false}
                                renderArrowPrev={CarouselNav1Prev}
                                renderArrowNext={CarouselNav1Next}
                                className="carousel-h-0"
                            >
                                {testiData.map((item, i) => (
                                    <img
                                        key={i}
                                        className="rounded-xl"
                                        src={`${folderData}${item}`}
                                    />
                                ))}
                            </Carousel>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
