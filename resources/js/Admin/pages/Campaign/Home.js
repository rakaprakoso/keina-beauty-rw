import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const CampaignHome = () => {
    const [data, setData] = useState(null)
    const key = 'koderahasia'
    useEffect(async () => {

        const dataFetch = await axios
            .get(`/api/admin/campaign`)
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
            setData(dataFetch.data);
            // console.log(dataFetch.data);
        } else {
            setData(dataFetch);
            // console.log(dataFetch);
        }

    }, []);
    return (
        <div>
            <div className="table w-full p-2">
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
                                    Name
                                </div>
                            </th>
                            <th className="p-2 border-r cursor-pointer text-sm text-gray-500">
                                <div className="flex items-center justify-center">
                                    Email
                                </div>
                            </th>
                            <th className="p-2 border-r cursor-pointer text-sm text-gray-500">
                                <div className="flex items-center justify-center">
                                    Phone Number
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
                                <td className="p-2 border-r">{item.name}</td>
                                <td className="p-2 border-r">{item.email}</td>
                                <td className="p-2 border-r">{item.phone_number}</td>
                                <td>
                                    <a href={`/admin/campaign/edit/${item.id}`} className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin">Edit</a>
                                    <form action={`/api/admin/campaign/${item.id}`} method="POST">
                                        <input type="hidden" name="_method" value="delete"/>
                                        <button className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin">Remove</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default CampaignHome
