import React, { useEffect, useState } from "react";
import Page from "../page";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import HttpService from "../../Admin/services/HttpService";
import Hero3 from "../components/Hero/Hero3";
import { useParams } from "react-router-dom";

function PostDetail(props) {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState(null);

    let { slug } = useParams();

    function txt_content(txt) {
        console.log({ txt: txt });
        var text = txt.replace(/<[^>]*>/g, "");
        console.log(text);
        return text;
    }

    function convertdate(date) {
        var date = new Date(date);
        var monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + " " + monthNames[monthIndex] + " " + year;
    }

    useEffect(async () => {
        const http = new HttpService();
        const url = `v1-post/${slug}`;
        const dataFetch = await http
            .getDataClient(url)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            });

        console.log(dataFetch);

        if (dataFetch) {
            setData(dataFetch);
        } else {
            setData(null);
        }
    }, []);
    return (
        <Page title="Keina Journey">
             <Hero3 imgBackground={data && data.post_image_thumbnail}/>
            <div className="page-wrapper -mt-40 z-10">
                <section className="py-10 px-14 bg-white mb-40 rounded shadow">
                    <div className="container mb-8">
                        <h1 className="text-center text-4xl font-bold">
                        {data && data.post_title}
                        </h1>
                        <div className="category mb-3 text-center">
                            by <a href="#">Keina Author</a> - {data && convertdate(data.created_at)}
                        </div>
                    </div>
                    {data && (
                        <div className="product-container flex justify-center">
                            <div className="product-content w-3/4">
                                <div className="image-wrap embed-responsive responsive-16by9 mb-6">

                                        <img
                                            className="object-cover object-center"
                                            src={data.post_image_thumbnail}
                                            alt={data.name}
                                        />

                                </div>
                                <div className="text-wrap">

                                    {parse(
                                             data.post_content
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* <div className={`product-container column-4`}>
                        {data && data.shift() &&
                            data.map((item, i) => (
                                <div className="product-content">
                                    <div className="image-wrap embed-responsive responsive-16by9">
                                        <a href={`/journey/${item.id}`}>
                                            <img
                                                className="object-cover object-center"
                                                src={item.post_image_thumbnail}
                                                alt={item.name}
                                            />
                                        </a>
                                    </div>
                                    <div className="text-wrap">
                                        <div className="category">
                                            <a href="#">Keina Author</a>
                                        </div>
                                        <a
                                            className="hvr hvr-underline-reveal pb-1"
                                            href={`/journey/${item.id}`}
                                        >
                                            <h3 className="text-3xl mt-2 font-semibold">
                                                {item.post_title}
                                            </h3>
                                            <p className="limit-text">
                                                {" "}
                                                {parse(
                                                    txt_content(
                                                        item.post_content
                                                    )
                                                )}
                                            </p>
                                            <button className="btn-text">
                                                {t("journey.read_more")}
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            ))}
                    </div> */}
                </section>
            </div>
        </Page>
    );
}

export default PostDetail;
