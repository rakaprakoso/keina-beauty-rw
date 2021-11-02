import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import CardOrders from '../../components/Cards/CardOrders'

const Orders = () => {
    const [data, setData] = useState(null)
    const key = 'koderahasia'
    useEffect(async () => {

        const dataFetch = await axios
            .get(`/api/admin/orders?key=${key}`)
            .then(function (response) {
                console.log(response);
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
            setData(dataFetch.data.data);
            // console.log(dataFetch.data);
        } else {
            setData(dataFetch);
            // console.log(dataFetch);
        }

    }, []);
    return (
        <div>
            <div className="flex flex-wrap">
                <div className="w-full mb-12 xl:mb-0 px-4">
                    {data && <CardOrders orders={data}/>}
                </div>
            </div>
            {/* <div className="table w-full p-2">
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="border-r p-2">
                                <input type="checkbox" />
                            </th>
                            <th className="p-2 border-r cursor-pointer text-sm text-gray-500">
                                <div className="flex items-center justify-center">
                                    ID
                                </div>
                            </th>
                            <th className="p-2 border-r cursor-pointer text-sm text-gray-500">
                                <div className="flex items-center justify-center">
                                    Image
                                </div>
                            </th>
                            <th className="p-2 border-r cursor-pointer text-sm text-gray-500">
                                <div className="flex items-center justify-center">
                                    Product Name
                                </div>
                            </th>
                            <th className="p-2 border-r cursor-pointer text-sm text-gray-500">
                                <div className="flex items-center justify-center">
                                    Price
                                </div>
                            </th>
                            <th className="p-2 border-r cursor-pointer text-sm text-gray-500">
                                <div className="flex items-center justify-center">
                                    Action
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {data && data.map((item, i) => (
                            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                                <td className="p-2 border-r">
                                    <input type="checkbox" />
                                </td>
                                <td className="p-2 border-r">{item.id}</td>
                                <td className="p-2 border-r">
                                    <img src={item.thumbnail_img} className="w-12 h-12" />
                                </td>
                                <td className="p-2 border-r">{item.name}</td>
                                <td className="p-2 border-r">{item.price}</td>
                                <td>
                                    <a href={`/admin/product/edit/${item.id}`} className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin">Edit</a>
                                    <form action={`/api/admin/product/${item.id}`} method="POST">
                                        <input type="hidden" name="_method" value="delete"/>
                                        <button className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin">Remove</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}

        </div>
    )
}

export default Orders
