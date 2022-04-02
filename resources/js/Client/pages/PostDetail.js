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
    const [loading, setLoading] = useState(true);

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
                return false;
            });
        setLoading(false);
        if (dataFetch) {
            setData(dataFetch);
        } else {
            setData(null);
        }
    }, []);
    return (
        <Page title={data ? data?.post_title : 'Keina Journey'}>
            <Hero3 imgBackground={data && data.post_image_thumbnail} />
            <div className="page-wrapper -mt-40 z-10">
                <section className="py-10 px-14 bg-white mb-40 rounded shadow">
                {loading && <div className="text-center">{t("loading")}</div>}
                    {!loading && (
                        <>
                        {data >= false && (
                                <div className="text-center">{t("post.noUrl")}</div>
                            )}
                            {data && (
                                <>
                                <div className="container mb-8">
                                    <h1 className="text-center text-4xl font-bold">
                                        {data && data.post_title}
                                    </h1>
                                    <div className="category mb-3 text-center">
                                        by <a href="#">Keina Author</a> -{" "}
                                        {data && convertdate(data.created_at)}
                                    </div>
                                </div>
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
                                                {parse(data.post_content)}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </section>
            </div>
        </Page>
    );
}

export default PostDetail;
