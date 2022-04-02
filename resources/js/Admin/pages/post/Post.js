import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import HttpService from "../../services/HttpService";
import CardPost from "../../components/Cards/CardPost";

const Post = () => {
    const [data, setData] = useState(null);
    useEffect(async () => {
        const http = new HttpService();
        const url = `admin/post`;
        const tokenId = "accessToken";
        const dataFetch = await http
            .getDataAdmin(url, tokenId)
            .then((data) => {
                return data.data;
            })
            .catch((error) => {
                return error;
            });

        if (dataFetch.success) {
            console.log(dataFetch.data.data)
            setData(dataFetch.data.data);
        } else {
            setData(null);
        }
    }, []);
    return (
        <div>
            <div className="flex flex-wrap">
                <div className="w-full mb-12 xl:mb-0 px-4">
                    {data && <CardPost data={data} />}
                </div>
            </div>
        </div>
    );
};

export default Post;
