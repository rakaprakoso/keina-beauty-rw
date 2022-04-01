import React, { useEffect, useState } from "react";
import Page from "../page";
import { useTranslation } from "react-i18next";
import parse from 'html-react-parser';
import HttpService from "../../Admin/services/HttpService";

function Post(props) {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState(null);

    useEffect(async () => {
        const http = new HttpService();
        const url = `v1/post`;
        const dataFetch = await http
            .getDataClient(url)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            });

            console.log(dataFetch)

        if (dataFetch.status == 200) {
            setData(dataFetch.data.data);
        } else {
            setData(dataFetch.data);
        }
    }, []);
    return (
        <Page title="Keina Journey">
            <div className="page-wrapper">
                <section className="py-14">
                    <div className={`product-container column-4`}>
                        {/* {JSON.stringify(data)} */}
                        {data && data.map((item, i) => (
                            <div className="product-content">
                                <div className="image-wrap embed-responsive responsive-1by1">
                                    <a href={`/product/${item.slug}`}>
                                        <img className="object-cover object-center" src={item.post_image_thumbnail} alt={item.name} />
                                    </a>
                                </div>
                                <div className="text-wrap">
                                    <div className="category">
                                        <a href="#">Keina Author</a>
                                    </div>
                                    <h3 className="title">
                                        <a className="hvr hvr-underline-reveal pb-1" href={`/product/${item.slug}`}>
                                            {item.post_title}
                                        </a>
                                    </h3>

                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Page>
    );
}

export default Post;
