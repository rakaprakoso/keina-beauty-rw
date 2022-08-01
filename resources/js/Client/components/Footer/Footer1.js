import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import logo from "../../../Public/Logo Big.png";

const Footer1 = () => {
    const socmedData = [
        {
            social: "Youtube",
            url: "https://www.youtube.com/channel/UCds9yHedZkZg4dtZu7TzDIA",
            icon: <FaYoutube />,
        },
        {
            social: "Instagram",
            url: "https://www.instagram.com/keina.beauty/",
            icon: <FaInstagram />,
        },
        {
            social: "Twitter",
            url: "https://twitter.com/keinabeauty",
            icon: <FaTwitter />,
        },
    ];
    return (
        <footer>
            <div className="footer-wrapper">
                <div className="top-part">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="logo flex mb-3">
                                <a
                                    href="/"
                                    className="remove_underline mx-auto lg:mx-0 "
                                >
                                    <img
                                        className="mx-auto lg:mx-0"
                                        src={logo}
                                        alt="Keina Beauty"
                                    />
                                </a>
                            </div>
                            <div>
                                <h4>No WhatsApp:</h4>
                                +62 811 3890 2333
                                <h4>Address:</h4>
                                Jl. Tukad Badung No.212, Renon, Denpasar
                                Selatan, Kota Denpasar, Bali 80226
                            </div>
                        </div>
                        <div className="col-lg-8 flex justify-center lg:justify-end">
                            <div className="social-container">
                                <div className="text-center lg:text-right">
                                    Follow Us
                                </div>
                                {socmedData.map((item, i) => (
                                    <a key={i} href={item.url}>
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider" />
                <div className="bottom-part">
                    <div className="text-center text-sm py-4">
                        Copyright &copy; 2021
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer1;
