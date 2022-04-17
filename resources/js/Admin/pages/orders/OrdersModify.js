import React, { useEffect, useState, useRef } from "react";
import Form from "../../components/Forms/form";
import { useHistory, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import { NumberFormat } from "../../../Client/components/Functions/NumberFormat";
import HttpService from "../../services/HttpService";
import moment from "moment";

const OrdersModify = () => {
    let { id, method } = useParams();
    const key = "koderahasia";
    const basePath = "/api/admin/orders";
    const [data, setData] = useState(null);
    const [path, setPath] = useState(basePath);

    useEffect(async () => {
        // if(method === 'edit'){
        const http = new HttpService();
        const url = `admin/orders/${id}?key=${key}`;
        const tokenId = "accessToken";
        const dataFetch = await http
            .getDataAdmin(url, tokenId)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            });

        // console.log(dataFetch.cartSession[5]);
        // setRawData(dataFetch);
        if (dataFetch.status == 200) {
            setData(dataFetch.data);
            setPath(basePath + "/" + dataFetch.data.id);
        } else {
            setData(dataFetch);
            // console.log(dataFetch);
        }
        // }
    }, []);

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const dataForm = [
        {
            name: "order_id",
            label: "Order ID",
            type: "text",
            value: data?.order_id,
        },
        {
            name: "price",
            label: "Price",
            type: "number",
            value: data?.totalPrice,
        },
        {
            name: "discount_price",
            label: "Discount Price",
            type: "number",
            value: data?.discount_price,
        },
        {
            name: "weight",
            label: "Weight (gr)",
            type: "number",
            value: data?.weight,
        },
        {
            name: "short_description",
            label: "Short Description",
            type: "tinyMCE",
            value: data?.short_description,
        },
        {
            name: "description",
            label: "Long Description",
            type: "tinyMCE",
            value: data?.description,
        },
        {
            name: "image",
            label: "Image",
            type: "file",
            filetype: "image",
            value: data?.thumbnail_img,
        },
        {
            name: "imageGallery",
            label: "image Gallery",
            type: "file",
            filetype: "image",
            value: data?.imagesArr?.join(","),
        },
    ];

    return (
        <div className="px-4">
            <div className="w-full p-10 bg-white shadow rounded">
                <div className="col-lg-8">
                    <h2 className="mb-3 text-xl">
                        Order ID : {data && data?.order_id}
                    </h2>

                    {data && (
                        <>
                            <h2 className="mb-3 text-xl">
                                Payment Status :
                                <span className="font-bold">
                                    {data &&
                                    data?.payment?.status == "settlement"
                                        ? " Paid"
                                        : null}
                                    {data && data?.payment?.status !== null
                                        ? null
                                        : " Not Paid"}
                                </span>
                            </h2>
                            <table className="w-full text-left rounded-lg mb-4">
                                <tbody>
                                    <tr>
                                        <td className="font-semibold">Name</td>
                                        <td>{data.nameBuyer}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Email</td>
                                        <td>{data.emailBuyer}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">
                                            Phone Number
                                        </td>
                                        <td>{data.phoneBuyer}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">
                                            Address
                                        </td>
                                        <td>{`${data.addressBuyer} - ${data.shippingAddressBuyer}`}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">
                                            Last Updated
                                        </td>
                                        <td>{moment(data.updated_at).format("DD MMMM YYYY, H:mm:ss")}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}

                    <div className="block overflow-x-auto mb-8 lg:mb-0">
                        <table className="w-full text-left rounded-lg">
                            <thead>
                                <tr className="text-gray-800 border border-b-0">
                                    <th className="px-4 py-3">Product</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Quantity</th>
                                    <th className="px-4 py-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data ? (
                                    data?.order_details?.map((item, i) => (
                                        <tr className="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0">
                                            <td className="px-4 py-4">
                                                {/* <input className="inline-block mr-3" type="checkbox" name={`product-1`} id="" /> */}
                                                <img
                                                    className="h-10 w-10 rounded-full inline-block mr-4"
                                                    src={
                                                        item?.product
                                                            ?.thumbnail_img
                                                    }
                                                    alt={item?.name}
                                                />
                                                {item?.product?.name}
                                            </td>
                                            <td className="px-4 py-4">
                                                {NumberFormat(
                                                    item?.price,
                                                    "Rp."
                                                )}
                                            </td>
                                            <td className="px-4 py-4">
                                                {item.qty}
                                            </td>
                                            <td className="px-4 py-4">
                                                {NumberFormat(
                                                    item?.price * item?.qty,
                                                    "Rp."
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>Loading</td>
                                    </tr>
                                )}

                                {data?.order_details === null ? (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            Data Not Found
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                            {data && (
                                <tfoot className="w-full text-gray-800 bg-gray-50 whitespace-no-wrap">
                                    <tr className="border border-b-0">
                                        <td
                                            className="px-4 py-2 text-right font-bold"
                                            colSpan="3"
                                        >
                                            Subtotal
                                        </td>
                                        <td className="px-4 py-2">
                                            {NumberFormat(
                                                data?.net_price,
                                                "Rp."
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="border border-b-0">
                                        <td
                                            className="px-4 py-2 text-right font-bold"
                                            colSpan="3"
                                        >
                                            Shipping Cost
                                        </td>
                                        <td className="px-4 py-2">
                                            {NumberFormat(
                                                data?.shipping_cost,
                                                "Rp."
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="border border-b-0">
                                        <td
                                            className="px-4 py-2 text-right font-bold"
                                            colSpan="3"
                                        >
                                            Discount
                                        </td>
                                        <td className="px-4 py-2">
                                            {NumberFormat(
                                                data?.couponamount
                                                    ? -1 * data?.couponamount
                                                    : 0,
                                                "Rp."
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td
                                            className="px-4 py-2 text-right font-bold"
                                            colSpan="3"
                                        >
                                            Total
                                        </td>
                                        <td className="px-4 py-2">
                                            {NumberFormat(
                                                parseInt(data.net_price) +
                                                    parseInt(
                                                        data.shipping_cost
                                                    ) -
                                                    parseInt(
                                                        data?.couponamount
                                                            ? data?.couponamount
                                                            : 0
                                                    ),
                                                "Rp."
                                            )}
                                        </td>
                                    </tr>
                                    {data?.couponcode && (
                                        <tr className="border">
                                            <td
                                                className="px-4 py-2 text-right font-bold"
                                                colSpan="3"
                                            >
                                                Coupon Used
                                            </td>
                                            <td className="px-4 py-2">
                                                {data?.affiliate ? (
                                                    <>
                                                        <i className="fas fa-circle text-green-500 mr-2"></i>
                                                        Affiliate | {data?.couponcode}
                                                    </>
                                                ) : (
                                                    <>{data?.couponcode}</>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
                {/* <form action={path}
                    // "/api/admin/product"
                    method="POST" enctype="multipart/form-data">
                    {method === 'edit' ?
                        <input type="hidden" name="_method" value="put" /> : null
                    }
                    <div>
                        {dataForm && dataForm.map((item, i) => (
                            // <Form key={i} list={item} />
                            <div key={i}>
                                {item?.label}
                                {item?.value}
                            </div>
                        ))
                        }
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form> */}
            </div>
        </div>
    );
};

export default OrdersModify;
