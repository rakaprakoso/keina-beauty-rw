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
import { Helmet } from "react-helmet";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import ProductThumbnail1 from '../../components/Products/ProductThumbnail1'
import HtmlToReact from '../../components/Functions/HtmlToReact'
import { connect, useSelector, useDispatch } from 'react-redux'
import ActionType from '../../redux/reducer/globalActionType';

import { addCart } from '../../redux/actions/globalAction'
import { NumberFormat, PercentFormat } from '../../components/Functions/NumberFormat';


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            otherItems: [],
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

    addToCart = async () => {
        await this.props.addCart(this.state.item.id)
        this.toggleButton(!this.setAlert);
    };

    //Fetch Data
    componentDidMount() {
        // const slug = ;
        fetch('/api/product/' + this.props.match.params.slug)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        // isLoaded: true,
                        item: result
                    });
                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        // isLoaded: true,
                        error
                    });
                    console.log(error);
                }
            )
        fetch(`/api/product?random=true&slug=${this.props.match.params.slug}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        otherItems: result
                    });
                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        // error
                    });
                    console.log(error);
                }
            )
    }

    render() {
        const { error, isLoaded, item, setAlert, otherItems } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                    <Helmet>
                        <title>{item.name} - Keina Beauty</title>
                        <meta name="description" content="Keina memiliki arti cahaya matahari, berkah dan menurut Bahasa Jepang, Keina identik dengan kesegaran alam dan kehijauan. Bermula dari pengertian sederhana, kami memiliki harapan tinggi bahwa nutrisi yang terkandung dalam produk skincare Keina Beauty dapat menjadi cahaya matahari bagi mereka yang ingin memiliki kulit sehat, cantik dan terawat." />
                    </Helmet>
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
                                        <div className="thumbnail-img">
                                            <div className="embed-responsive responsive-1by1">
                                                <img className="object-cover object-center left-0" src={item.thumbnail_img} alt={item.name} />
                                            </div>
                                        </div>
                                        {item.images.map((img, i) => (
                                                <div className="thumbnail-img">
                                                    <div className="embed-responsive responsive-1by1">
                                                        <img className="object-cover object-center left-0" src={img.image_path} alt={item.name} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Carousel>

                                </div>
                                <div className="col-lg-6 flex items-center">
                                    <div className="product-brief">
                                        <h1 className="product-name">{item.name}</h1>
                                        {item.discount_price !== null ? (
                                            <>
                                                <h2 className="text-red-600 line-through text-base inline-block">
                                                    {NumberFormat(item.price, 'Rp.')}
                                                </h2>
                                                <span className="inline-block bg-gray-200 p-1 ml-2 rounded">{PercentFormat(item.discount_price, item.price)}</span>
                                                <h2 className="product-price">{NumberFormat(item.discount_price, 'Rp.')}</h2>
                                            </>
                                        ) :
                                            <h2 className="product-price">{item.money}</h2>
                                        }
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
                                        <div className="direct-contact">
                                            <ChatToWhatsapp title={item && item.name} />
                                        </div>
                                        <div className="actions">
                                            {/* <button className="btn add-to-fav hvr hvr-icon-pulse">
                                                <span className="icon">
                                                    <IoHeartOutline className="hvr-icon " />
                                                </span>
                                                Add to Favorites
                                            </button> */}
                                            {/* <button onClick={() => this.props.addCart()} className="btn add-to-cart hvr hvr-icon-forward"> */}
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
                                                <Tab>Description</Tab>
                                                {/* <Tab>Review</Tab> */}
                                            </TabList>

                                            <TabPanel>
                                                <div className="full-description">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <HtmlToReact data={item.description} />
                                                        </div>
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
                            <ProductThumbnail1 data={otherItems} columns={3} />
                        </section>
                    </div>
                </>
            )
        }
    }
}

const ChatToWhatsapp = (props) => {
    const phone_number = '6281138902333'
    const text = encodeURIComponent(`Hai, Saya ingin order ${props.title}, apa saja ya kandungannya? Apakah baik untuk kondisi kulit saya?`);
    var url = `https://api.whatsapp.com/send?phone=${phone_number}&text=${text}`
    return (
        <a href={url} className="btn whatsapp hvr hvr-icon-pulse-shrink">
            <span className="icon">
                <FaWhatsapp className="hvr-icon" />
            </span>
            #TanyaKeina
        </a>
    )
}

const testimonialsData = [
    {
        name: 'Putri Maharani',
        testimonial: 'Barang bagus, kualitas luarbiasa. Nggak bakal nyesel'
    },
    {
        name: 'Ovi',
        testimonial: 'Efek nya sangat tidak terduga, bermanfaat dan juga menyehatkan'
    },
    {
        name: 'Novita Sari',
        testimonial: 'Pelayanan ramah, kualitas memuaskan!'
    },
    {
        name: 'Ummu Yuliandari',
        testimonial: 'Nggak akan nyesel order disini'
    },
]

const mapStateToProps = (state) => {
    return {
        totalCart: state.totalCart,
        cartData: state.cartData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: () => dispatch({ type: ActionType.ADD_CART }),
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Product)
// export default connect(mapStateToProps, {addCart})(Product)
export default connect(mapStateToProps, { addCart, mapDispatchToProps })(Product)
