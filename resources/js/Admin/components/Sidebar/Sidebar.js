/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const adminMenu = [
    {
        path: "/admin",
        name: "Dashboard",
        icon: "fas fa-chart-bar",
    },
    {
        path: "/admin/product",
        name: "Product",
        icon: "fas fa-user-edit",
    },
    {
        path: "/admin/post",
        name: "Post",
        icon: "fas fa-cog",
    },
    {
        path: "/admin/orders",
        name: "Orders",
        icon: "fas fa-cog",
    },
    {
        path: "/admin/coupon",
        name: "Coupon",
        icon: "fas fa-cog",
    },
    {
        path: "/admin/campaign",
        name: "Campaign",
        icon: "fas fa-clipboard-list",
    },
]
  return (
    <>
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            {/* Toggler */}
            <button
                className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                type="button"
                onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
            >
                <i className="fas fa-bars"></i>
            </button>
            {/* Brand */}
            <Link
                className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/"
            >
               Keina Beauty
            </Link>
            {/* User */}
            <ul className="md:hidden items-center flex flex-wrap list-none">
                {/* <li className="inline-block relative">
                    <NotificationDropdown />
                </li>
                <li className="inline-block relative">
                    <UserDropdown />
                </li> */}
                <li className="inline-block relative">
                    <form action="/logout" method="post" className="flex flex-row flex-wrap items-center lg:ml-auto mr-3">
                        <input type="hidden" name="_token" value={document.getElementsByTagName("META")[3].content} />
                        <button className="btn bg-white text-gray-900"><i className="fas fa-sign-out-alt mr-2"></i>Logout</button>
                    </form>
                </li>
            </ul>
            {/* Collapse */}
            <div
                className={
                    "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                    collapseShow
                }
            >
                {/* Collapse header */}
                <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                    <div className="flex flex-wrap">
                        <div className="w-6/12">
                            <Link
                                className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                to="/"
                            >
                                Keina Beauty
                            </Link>
                        </div>
                        <div className="w-6/12 flex justify-end">
                            <button
                                type="button"
                                className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                onClick={() => setCollapseShow("hidden")}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Form */}
                {/* <form className="mt-6 mb-4 md:hidden">
                    <div className="mb-3 pt-0">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                        />
                    </div>
                </form> */}

                {/* Heading */}
                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                    Menu
                </h6>
                {/* Navigation */}

                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                    {adminMenu.map((item, i) => (
                        <li key={i} className="items-center">
                            <Link
                                className={
                                    "text-xs uppercase py-3 font-bold block " +
                                    (window.location.pathname == item.path
                                        ? "text-green-700 hover:text-green-800"
                                        : "text-blueGray-700 hover:text-blueGray-500")
                                }
                                to={item.path}
                            >
                                <i
                                    className={
                                        `${item.icon} mr-2 text-sm ` +
                                        (window.location.pathname == item.path
                                            ? "opacity-75"
                                            : "text-blueGray-700")
                                    }
                                ></i>{" "}
                                {item.name}
                            </Link>
                        </li>
                    ))}


                    {/* <li className="items-center">
                        <Link
                            className={
                                "text-xs uppercase py-3 font-bold block " +
                                (window.location.href.indexOf("/admin/settings") !== -1
                                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                                    : "text-blueGray-700 hover:text-blueGray-500")
                            }
                            to="/admin/settings"
                        >
                            <i
                                className={
                                    "fas fa-tools mr-2 text-sm " +
                                    (window.location.href.indexOf("/admin/settings") !== -1
                                        ? "opacity-75"
                                        : "text-blueGray-300")
                                }
                            ></i>{" "}
                            Settings
                        </Link>
                    </li>

                    <li className="items-center">
                        <Link
                            className={
                                "text-xs uppercase py-3 font-bold block " +
                                (window.location.href.indexOf("/admin/tables") !== -1
                                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                                    : "text-blueGray-700 hover:text-blueGray-500")
                            }
                            to="/admin/tables"
                        >
                            <i
                                className={
                                    "fas fa-table mr-2 text-sm " +
                                    (window.location.href.indexOf("/admin/tables") !== -1
                                        ? "opacity-75"
                                        : "text-blueGray-300")
                                }
                            ></i>{" "}
                            Tables
                        </Link>
                    </li>

                    <li className="items-center">
                        <Link
                            className={
                                "text-xs uppercase py-3 font-bold block " +
                                (window.location.href.indexOf("/admin/maps") !== -1
                                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                                    : "text-blueGray-700 hover:text-blueGray-500")
                            }
                            to="/admin/maps"
                        >
                            <i
                                className={
                                    "fas fa-map-marked mr-2 text-sm " +
                                    (window.location.href.indexOf("/admin/maps") !== -1
                                        ? "opacity-75"
                                        : "text-blueGray-300")
                                }
                            ></i>{" "}
                            Maps
                        </Link>
                    </li>
                 */}
                </ul>
            </div>
        </div>
    </nav>
</>
);
}
