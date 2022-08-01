import React from "react";
import PropTypes from "prop-types";

// components
import TableDropdown from "../Dropdowns/TableDropdown.js"
import { NumberFormat, PercentFormat } from "../../../Client/components/Functions/NumberFormat.js";
import { Link } from "react-router-dom";

export default function CardProducts({ color, products }) {
    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative px-4 max-w-full flex-grow">
                            <h3
                                className={
                                    "font-semibold text-lg " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Products List
                            </h3>
                        </div>
                        <div className="relative px-4">
                            <Link to={`/admin/product/create`}
                                        className="bg-primary text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        Create
                                    </Link>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Product
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Price
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Visible
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Main Product
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((item, i) => (
                            <tr key={i}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    <img
                                        src={item.thumbnail_img}
                                        className="h-12 w-12 bg-white rounded-full border"
                                        alt={item.name}
                                    ></img>
                                    <span
                                        className={
                                            "ml-3 font-bold " +
                                            +(color === "light" ? "text-blueGray-600" : "text-white")
                                        }
                                    >
                                        {item.name} - {item.id}
                                    </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {item.discount_price !== null ? (
                                            <>
                                                <div className="text-red-600 line-through">
                                                    {NumberFormat(item.price, 'Rp.')}
                                                <span className="inline-block bg-gray-200 p-1 ml-2 rounded text-gray-900">{PercentFormat(item.discount_price, item.price)}</span>
                                                </div>
                                                <div>{NumberFormat(item.discount_price, 'Rp.')}</div>
                                            </>
                                        ) :
                                            NumberFormat(item.price, 'Rp.')
                                        }
                                    {/* {NumberFormat(item.price, 'Rp.')} */}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {/* <i className="fas fa-circle text-orange-500 mr-2"></i> pending */}
                                    {item.preview == '1' ?
                                        <><i className="fas fa-circle text-green-500 mr-2"></i> Show</>
                                        :
                                        <><i className="fas fa-circle text-gray-500 mr-2"></i> Hidden</>
                                    }
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {/* <i className="fas fa-circle text-orange-500 mr-2"></i> pending */}
                                    {item.hero == '1' ?
                                        <><i className="fas fa-circle text-green-500 mr-2"></i> Yes</>
                                        :
                                        <><i className="fas fa-circle text-gray-500 mr-2"></i> No</>
                                    }
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <Link to={`/admin/product/edit/${item.id}`}
                                        className="bg-primary text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        Detail
                                    </Link>
                                    <TableDropdown />
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

CardProducts.defaultProps = {
    color: "light",
};

CardProducts.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
