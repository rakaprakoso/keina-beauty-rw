import { React,useEffect,useState } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import {Helmet} from "react-helmet";

import Header from './components/Header';
import Footer1 from './components/Footer/Footer1';
import NotFound from './pages/NotFound';

import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import Product from './pages/Ecommerce/Product';
import {Cart,Checkout} from './pages/Ecommerce/Transactions.module'
import Order from './pages/Ecommerce/Order';
import JoinCampaign from './pages/JoinCampaign';
import Post from './pages/Post';
import PostDetail from './pages/PostDetail';
import PopUpPromo from './components/Modal/PopUpPromo';
import Location from './pages/Location';

const Main = props => {
    return (
        <>
            <Helmet>
                <link rel="shortcut icon" href="\assets\green-white.png" type="image/x-icon" />
            </Helmet>
            <div id="header">
                <Header />
            </div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About} />
                <Route path="/shop" component={Shop} />
                <Route exact path="/journey" component={Post} />
                <Route exact path="/location" component={Location} />
                <Route path="/journey/:slug" component={PostDetail} />
                <Route path="/joincampaign" component={JoinCampaign} />
                <Route path="/product/:slug" component={Product}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/order" component={Order}/>

                <Route path="/contact" component={Contact}/>
                <Route component={NotFound} />
            </Switch>
            <PopUpPromo/>
            <Footer1 />
        </>
    )
};
export default Main;
