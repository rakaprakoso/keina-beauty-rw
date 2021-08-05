import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Order = () => {
    const formData = [
        {
            label: 'Name',
            name: 'name',
        },
        {
            label: 'Phone Number',
            name: 'phone_number',
        },
        {
            label: 'Email Address',
            name: 'email',
        },
    ]

    let query = useQuery();

    // console.log(query.get("order_id"));

    const [data, setData] = useState(null);
    // const [rawData, setRawData] = useState(null);
    // const [weight, setWeight] = useState(null);

    useEffect(async () => {
        const dataFetch = await axios
            .get("/api/orderStatus?order_id=" + query.get("order_id"))
            .then(function (response) {
                // console.log(response);
                // return response.data;
                return response;
            })
            .catch(function (error) {
                return 404;
                console.log(error);
            });
        // console.log(dataFetch.cartSession[5]);
        // setRawData(dataFetch);
        if (dataFetch.status == 200) {
            setData(dataFetch.data);
            console.log(dataFetch.data);
        } else {
            setData(dataFetch);
            console.log(dataFetch);
        }
        // var tempWeight = 0;
        // data.forEach((item, i) => {
        //     tempWeight += rawData.cartSession[item.id]['qty'] * item.weight;
        // });
        // setWeight(dataFetch.\);
        // console.log(rawData);
    }, []);



    return (
        <>
            <div className="heading bg-gray-200 py-14">
                <div className="page-wrapper">
                    <h1 className="text-center text-4xl font-bold">
                        Order Detail
                    </h1>
                </div>
            </div>
            <div className="page-wrapper py-10">
                <div>
                    <div className="block mx-6">

                        {query.get("order_id") == null ?
                            <form action="/order" method="get">
                                <input type="text" name="order_id" placeholder="Input Your Order ID" />
                                <button type="submit" class="btn btn-primary">
                                    Check Order
                                </button>
                            </form>
                            :
                            data ? data !== 404 ?
                                query.get("order_id") &&
                                <div className="row">
                                    <div className="col-lg-8">
                                        <h2 className="mb-3 text-xl">Order ID : {data && data.order.order_id}</h2>

                                        {data &&
                                            <table className="w-full text-left rounded-lg mb-4">
                                                <tbody>
                                                    <tr>
                                                        <td className="font-semibold">Name</td>
                                                        <td>{data.order.nameBuyer}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Email</td>
                                                        <td>{data.order.emailBuyer}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Phone Number</td>
                                                        <td>{data.order.phoneBuyer}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Address</td>
                                                        <td>{`${data.order.addressBuyer} - ${data.order.shippingAddressBuyer}`}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        }

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
                                                    {data ? data?.order.order_details?.map((item, i) =>
                                                        <tr className="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0">
                                                            <td className="px-4 py-4">
                                                                {/* <input className="inline-block mr-3" type="checkbox" name={`product-1`} id="" /> */}
                                                                <img className="h-10 w-10 rounded-full inline-block mr-4" src={item.product.thumbnail_img} alt={item.name}/>
                                                                {item.product.name}
                                                            </td>
                                                            <td className="px-4 py-4">Rp. {item.price}</td>
                                                            <td className="px-4 py-4">
                                                                {item.qty}
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                Rp. {item.price * item.qty}
                                                            </td>

                                                        </tr>
                                                    ) : <tr><td>Loading</td></tr>}

                                                    {data?.order_details === null ?
                                                        <tr><td colSpan={4} className="text-center">Data Not Found</td></tr>
                                                        :
                                                        null
                                                    }

                                                </tbody>
                                                {data &&
                                                    <tfoot className="w-full text-gray-800 bg-gray-50 whitespace-no-wrap">
                                                        <tr className="border border-b-0">
                                                            <td className="px-4 py-2 text-right font-bold" colSpan="3">Subtotal</td>
                                                            <td className="px-4 py-2">Rp. {data.net_price}</td>
                                                        </tr>
                                                        <tr className="border border-b-0">
                                                            <td className="px-4 py-2 text-right font-bold" colSpan="3">Shipping Cost</td>
                                                            <td className="px-4 py-2">Rp. {data.order.shipping_cost}</td>
                                                        </tr>
                                                        <tr className="border">
                                                            <td className="px-4 py-2 text-right font-bold" colSpan="3">Total</td>
                                                            <td className="px-4 py-2">Rp. {parseInt(data.net_price) + parseInt(data.order.shipping_cost)}</td>
                                                        </tr>
                                                    </tfoot>
                                                }
                                            </table>
                                        </div>

                                    </div>
                                    <div className="col-lg-4">
                                        <div className="bg-gray-50 p-8 mb-3">
                                            {data &&
                                                <>
                                                    <h2 className="text-lg font-semibold mb-4 text-center">Payment Detail : <span className="font-bold">{data && data?.status !== null ? data?.status?.transaction_status : 'Not Paid'}</span></h2>
                                                    <div className="divider mb-5" />
                                                    <div className={`${data?.status?.transaction_status != 'settlement' ? 'block' : 'hidden'}`}>
                                                        <a href={data.link} className={`btn btn-primary w-full text-center`}>
                                                            Pay Now
                                                        </a>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <h2 className="text-xl block">Find Another Order ?</h2>
                                        <form action="/order" method="get">
                                            <input type="text" name="order_id" placeholder="Input Your Order ID" />
                                            <button type="submit" class="btn btn-primary">
                                                Check Order
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                :
                                <>
                                    <h2>Data Not Found</h2>
                                    <form action="/order" method="get">
                                        <input type="text" name="order_id" placeholder="Input Your Order ID" />
                                        <button type="submit" class="btn btn-primary">
                                            Check Order
                                        </button>
                                    </form>
                                </>
                                :
                                <h2>Loading</h2>

                        }
                        {/* <table className="w-full text-left rounded-lg">
                            <thead>
                                <tr className="text-gray-800 border border-b-0">
                                    <th className="px-4 py-3">Product</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Quantity</th>
                                    <th className="px-4 py-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr className="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0">
                                        <td className="px-4 py-4">
                                            <input className="inline-block mr-3" type="checkbox" name={`product-${i}`} id="" />
                                            <img className="h-10 w-10 rounded-full inline-block mr-4" src="https://keinabeauty.com/wp-content/uploads/2021/02/DSCF0891_1-600x929.jpg" alt="" />
                                            Minimalistic shop for multipurpose use
                                        </td>
                                        <td className="px-4 py-4">Rp. 200.000</td>
                                        <td className="px-4 py-4">
                                            <input type="number" name="qty" id="" />
                                        </td>
                                        <td className="px-4 py-4">
                                            Rp.400.000
                                        </td>

                                    </tr>))}

                            </tbody>
                        </table> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order
