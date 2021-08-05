import React, { Component, useState, Fragment } from 'react'
import parse from 'html-react-parser';
import ReactDOM from "react-dom";
import { useHistory, useParams } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./Product.scss";

import { FaWhatsapp } from "react-icons/fa";
import { IoHeartOutline, IoCart, IoBagHandle } from "react-icons/io5";

import { CarouselNav1Prev, CarouselNav1Next, CarouselNav1 } from '../../components/Carousel/CarouselNav1'

import { Carousel } from 'react-responsive-carousel';

import axios from "axios"

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: [],

            alert: false,
            setAlert: false,
            alertMessage: "HEYO",
        };
    }

    toggleButton(condition) {
        this.setState({
            setAlert: condition,
        });
    }

    async addToCart() {

        // POST request using axios with async/await
        const product = {
            product_id: this.props.match.params.slug,
            qty: 1,

        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        };
        const response = await fetch('/api/ajax/cart', requestOptions);

        const data = await response.json();
        console.log(data);
        // alert(data.data);
        this.toggleButton(!this.setAlert);

        // this.setState({ articleId: response.data.id });
    };

    //Fetch Data
    componentDidMount() {
        // const slug = ;
        fetch('/api/product/' + this.props.match.params.slug)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        item: result
                    });
                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    console.log(error);
                }
            )
    }

    render() {
        const { error, isLoaded, item, setAlert } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (

                <>

                    <div className={`alert flex w-full fixed z-30 pb-16 duration-500 ${setAlert ? "opacity-1 bottom-0" : "opacity-0 -bottom-full"}`}>
                        <div className="text m-auto bg-primary text-gray-50 font-bold shadow py-3 px-4 relative">
                            <button className="absolute -top-4 -right-4 bg-red-700 leading-7 w-7 h-7 rounded-full" onClick={() => this.toggleButton(!setAlert)}>X</button>
                            Product Added to Cart
                        </div>
                    </div>

                    <div className="page-wrapper">
                        <section className="py-10">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="thumbnail-img">
                                        <div className="embed-responsive responsive-1by1">
                                            <img className="object-cover object-center" src={item.thumbnail_img} alt="" />
                                            </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 flex items-center">
                                    <div className="product-brief">
                                        <h1 className="product-name">{item.name}</h1>
                                        <h2 className="product-price">Rp. {item.price}</h2>
                                        <div className="product-short-desc">
                                            {item.short_description && parse(item.short_description)}
                                        </div>

                                        {/* <div className="category">
                                            <strong>
                                                Category :
                                            </strong>
                                            <span>
                                                <a href="#">
                                                    Skin Care
                                                </a>
                                            </span>
                                            <span>
                                                <a href="#">
                                                    Treatment
                                                </a>
                                            </span>
                                        </div> */}
                                        {/* <div className="direct-contact">
                                            <a href="#" className="btn whatsapp hvr hvr-icon-pulse-shrink">
                                                <span className="icon">
                                                    <FaWhatsapp className="hvr-icon" />
                                                </span>
                                                #TanyaKeina
                                            </a>
                                        </div> */}
                                        <div className="actions">
                                            {/* <button className="btn add-to-fav hvr hvr-icon-pulse">
                                                <span className="icon">
                                                    <IoHeartOutline className="hvr-icon " />
                                                </span>
                                                Add to Favorites
                                            </button> */}
                                            <button onClick={() => this.addToCart()} className="btn add-to-cart hvr hvr-icon-forward">
                                                <span className="icon">
                                                    <IoCart className="hvr-icon " />
                                                </span>
                                                Add to Cart
                                            </button>
                                            {/* <button className="btn buy-now hvr hvr-icon-forward">
                                                <span className="icon">
                                                    <IoBagHandle className="hvr-icon " />
                                                </span>
                                                Buy Now
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-10">
                            <div className="row">
                                <div className="col-12">
                                    <div className="product-detail">
                                        <Tabs>
                                            <TabList>
                                                <Tab>Mengapa memilih kami ?</Tab>
                                                {/* <Tab>Review</Tab> */}
                                            </TabList>

                                            <TabPanel>
                                                <div className="full-description">
                                                    <div className="row">
                                                        <div className="col-lg-8 flex items-center">
                                                            <div>{parse(item.description)}</div>
                                                        </div>
                                                        {/* <div className="col-lg-4 flex items-center">
                                                            <div className="px-0 lg:px-10 py-0 lg:py-3">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <img src="https://keinabeauty.com/wp-content/uploads/2021/05/No-Additional-Fragrances-Green.png" alt="" />
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <img src="https://keinabeauty.com/wp-content/uploads/2021/05/No-Additional-Fragrances-Green.png" alt="" />
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <img src="https://keinabeauty.com/wp-content/uploads/2021/05/No-Additional-Fragrances-Green.png" alt="" />
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <img src="https://keinabeauty.com/wp-content/uploads/2021/05/No-Additional-Fragrances-Green.png" alt="" />
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <img src="https://keinabeauty.com/wp-content/uploads/2021/05/No-Additional-Fragrances-Green.png" alt="" />
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <img src="https://keinabeauty.com/wp-content/uploads/2021/05/No-Additional-Fragrances-Green.png" alt="" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                     */}
                                                    </div>

                                                    {/* <div className="px-0 lg:px-44">
                                                        <div className="embed-responsive responsive-16by9">
                                                            <iframe src="https://www.youtube.com/embed/BvZHQaK8Wdg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="testimonials">
                                                    <div className="testimonial-1 py-4 md:py-12">
                                                        <div className="container mx-auto px-4">

                                                            <Carousel

                                                                emulateTouch={true}
                                                                showStatus={false}
                                                                autoPlay={false}
                                                                infiniteLoop={true}
                                                                interval={10000}
                                                                showThumbs={false}
                                                                renderArrowPrev={CarouselNav1Prev}
                                                                renderArrowNext={CarouselNav1Next}
                                                            >
                                                                {testimonialsData.map((item, i) => (
                                                                    <div className="mx-6 lg:mx-24 md:px-4 mt-6 md:mt-0 ">
                                                                        <div className="testimonial rounded-xl p-6 border-2 border-solid flex flex-col lg:flex-row hover:border-indigo-400 hover:bg-indigo-100 transition-colors duration-300">
                                                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden m-auto md:mr-6 flex-shrink-0">
                                                                                <img src="//via.placeholder.com/100/eee" alt="profile image" className="w-full h-full object-cover" />
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-gray-600">
                                                                                    {`" ${item.testimonial} "`}
                                                                                </p>
                                                                                <div className="text-gray-900 font-bold uppercase mt-6">- {item.name}</div>
                                                                                <div className="text-gray-600">Apple</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </Carousel>

                                                        </div>
                                                    </div>

                                                </div>
                                            </TabPanel>
                                            {/* <TabPanel>
                                                <h2>Any content 2</h2>
                                            </TabPanel> */}
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </>
            )
        }
    }
}

const testimonialsData = [
    {
        name: 'John Doe',
        testimonial: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae rem iure voluptas soluta recusandae voluptatum, rerum asperiores, veritatis quibusdam quis, consequuntur ab. Nostrum ad labore quia sunt veritatis, ab harum!'
    },
    {
        name: 'John Doe',
        testimonial: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae rem iure voluptas soluta recusandae voluptatum, rerum asperiores, veritatis quibusdam quis, consequuntur ab. Nostrum ad labore quia sunt veritatis, ab harum!'
    },
    {
        name: 'John Doe',
        testimonial: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae rem iure voluptas soluta recusandae voluptatum, rerum asperiores, veritatis quibusdam quis, consequuntur ab. Nostrum ad labore quia sunt veritatis, ab harum!'
    },
    {
        name: 'John Doe',
        testimonial: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae rem iure voluptas soluta recusandae voluptatum, rerum asperiores, veritatis quibusdam quis, consequuntur ab. Nostrum ad labore quia sunt veritatis, ab harum!'
    },
    {
        name: 'John Doe',
        testimonial: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae rem iure voluptas soluta recusandae voluptatum, rerum asperiores, veritatis quibusdam quis, consequuntur ab. Nostrum ad labore quia sunt veritatis, ab harum!'
    },
    {
        name: 'John Doe',
        testimonial: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae rem iure voluptas soluta recusandae voluptatum, rerum asperiores, veritatis quibusdam quis, consequuntur ab. Nostrum ad labore quia sunt veritatis, ab harum!'
    },
    {
        name: 'John Doe',
        testimonial: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae rem iure voluptas soluta recusandae voluptatum, rerum asperiores, veritatis quibusdam quis, consequuntur ab. Nostrum ad labore quia sunt veritatis, ab harum!'
    },
    {
        name: 'John Doe',
        testimonial: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae rem iure voluptas soluta recusandae voluptatum, rerum asperiores, veritatis quibusdam quis, consequuntur ab. Nostrum ad labore quia sunt veritatis, ab harum!'
    },
]

export default Product
