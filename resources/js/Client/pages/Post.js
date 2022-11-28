import React, { useEffect, useState } from "react";
import Page from "../page";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import HttpService from "../../Admin/services/HttpService";
import { Link } from "react-router-dom";

function Post(props) {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    function txt_content(txt) {
        console.log({ txt: txt });
        var text = txt.replace(/<[^>]*>/g, "");
        console.log(text);
        return text;
    }

    useEffect(async () => {
        const http = new HttpService();
        const url = `v1-post`;
        const dataFetch = await http
            .getDataClient(url)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            });

        setLoading(false);
        if (dataFetch && dataFetch.success) {
            setData(dataFetch.data.data);
        } else {
            setData(null);
        }
    }, []);
    return (
        <Page title="Keina Journey">
            <div className="page-wrapper">
                <section className="py-14">
                    <div className="container mb-8">
                        <h1 className="text-center text-4xl font-bold">
                            {t("journey.title")}
                        </h1>
                    </div>
                    {loading && <div className="text-center">{t("loading")}</div>}
                    {!loading && (
                        <>
                            {data >= false && (
                                <div className="text-center">{t("journey.noData")}</div>
                            )}

                            {data && data[0] && (
                                <div className="product-container flex justify-center">
                                    <div className="product-content w-1/2">
                                        <div className="image-wrap embed-responsive responsive-16by9">
                                            <Link to={`/journey/${data[0].id}`}>
                                                <img
                                                    className="object-cover object-center"
                                                    src={
                                                        data[0]
                                                            .post_image_thumbnail
                                                    }
                                                    alt={data[0].name}
                                                />
                                            </Link>
                                        </div>
                                        <div className="text-wrap">
                                            <div className="category">
                                                <a href="#">Keina Author</a>
                                            </div>
                                            <Link
                                                className="hvr hvr-underline-reveal pb-1"
                                                to={`/journey/${data[0].id}`}
                                            >
                                                <h3 className="text-3xl mt-2 font-semibold">
                                                    {data[0].post_title}
                                                </h3>
                                                <p className="limit-text">
                                                    {parse(
                                                        txt_content(
                                                            data[0].post_content
                                                        )
                                                    )}
                                                </p>
                                                <button className="btn-text">
                                                    {t("journey.read_more")}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className={`product-container column-4`}>
                                {data &&
                                    data
                                        .filter((element, index) => index > 0)
                                        .map((item, i) => (
                                            <div className="product-content">
                                                <div className="image-wrap embed-responsive responsive-16by9">
                                                    <Link
                                                        to={`/journey/${item.id}`}
                                                    >
                                                        <img
                                                            className="object-cover object-center"
                                                            src={
                                                                item.post_image_thumbnail
                                                            }
                                                            alt={item.name}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="text-wrap">
                                                    <div className="category">
                                                        <a href="#">
                                                            Keina Author
                                                        </a>
                                                    </div>
                                                    <Link
                                                        className="hvr hvr-underline-reveal pb-1"
                                                        to={`/journey/${item.id}`}
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
                                                            {t(
                                                                "journey.read_more"
                                                            )}
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        </>
                    )}
                </section>
                <div>
                    <div className="mb-4 lg:my-16 bg-gray-50 rounded-lg p-10 shadow ml-0 lg:-ml-16">
                        <h3 className="text-left mb-4 text-2xl">
                            <strong>
                            Testimoni Media
                            </strong>
                        </h3>
                        <hr />
                        <p className="break-words">
                            <ul>
                                <li><a href="https://id.berita.yahoo.com/peduli-bumi-inilah-rekomendasi-produk-013000494.html" target="_blank">https://id.berita.yahoo.com/peduli-bumi-inilah-rekomendasi-produk-013000494.html</a></li>
                                <li><a href="http://m.fimela.com/beauty-health/read/4581233/peduli-bumi-inilah-rekomendasi-produk-skincare-lokal-yang-ramah-lingkungan?utm_source=Mobile&utm_medium=whatsapp&utm_campaign=Share_Top" target="_blank">http://m.fimela.com/beauty-health/read/4581233/peduli-bumi-inilah-rekomendasi-produk-skincare-lokal-yang-ramah-lingkungan?utm_source=Mobile&utm_medium=whatsapp&utm_campaign=Share_Top</a></li>
                                <li><a href="https://hypeabis.id/read/1321-nirmala-aninda/keina-beau" target="_blank">https://hypeabis.id/read/1321-nirmala-aninda/keina-beau</a></li>
                                <li><a href="https://kurio.id/app/articles/60c80650001c23c062998ae7" target="_blank">https://kurio.id/app/articles/60c80650001c23c062998ae7</a></li>
                                <li><a href="https://liff.line.me/1454988026-zWDdDpKq/v2/article/jlrxzD?utm_source=washare" target="_blank">https://liff.line.me/1454988026-zWDdDpKq/v2/article/jlrxzD?utm_source=washare</a></li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default Post;
