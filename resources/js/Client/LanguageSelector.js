import React, { Fragment, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Menu, Transition } from "@headlessui/react";
import { IoChevronDown } from "react-icons/io5";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();

    const languageOptions = [
        {
            label: "English",
            labelSelected: "EN",
            id: "en",
        },
        {
            label: "Indonesia",
            labelSelected: "ID",
            id: "id",
        },
    ];
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const changeSelectedLanguage = (lang_id) => {
        const index = languageOptions.findIndex((item) => item.id === lang_id);
        setSelectedLanguage(languageOptions[index]);
        localStorage.setItem("lang", lang_id);
        document.documentElement.lang = lang_id;
    };

    useEffect(async () => {
        if (localStorage.getItem("lang") || i18n.language) {
            changeSelectedLanguage(localStorage.getItem("lang"));
        } else {
            changeSelectedLanguage(languageOptions[0]["id"]);
        }
    }, []);

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
        changeSelectedLanguage(event.target.value);
    };

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary">
                        {selectedLanguage && (
                            <>
                                <img className="h-5 w-6 object-contain shadow mr-2" src={`/i18n/flags/${selectedLanguage.labelSelected}.png`} /> {selectedLanguage.labelSelected}
                            </>
                        )}
                        <IoChevronDown
                            className="-mr-1 ml-2 h-5 w-5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1" onChange={changeLanguage}>
                            {languageOptions.map((item, i) => (
                                <Menu.Item key={i}>
                                    {({ active }) => (
                                        <label
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            <input
                                                type="radio"
                                                value={item.id}
                                                name="language"
                                                className="hidden"
                                                // defaultChecked
                                            />
                                            {item.label}
                                        </label>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>

            {/* <div onChange={changeLanguage}>
                <input type="radio" value="en" name="language" defaultChecked />{" "}
                English
                <input type="radio" value="zh-hk" name="language" /> Chinese
                <input type="radio" value="de" name="language" />
                German
                <input type="radio" value="ar" name="language" /> Arabic
            </div> */}
        </>
    );
};

export default LanguageSelector;
