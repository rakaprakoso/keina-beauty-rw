import React, { useState } from "react";
import TinyMCEForm from "./TinyMCE";

const Form = (props, cb) => {
    // console.log(props.list);

    // const [data, setData] = useState(null);

    var { name, label, type, value, filetype, options,optionsLabel,placeholder } = props.list;
    var formik = props.formik
    // console.log(filetype);

    // setData(props.list)

    // switch (name) {
    //     case 'name':
    //         setData(props.data.name)
    //         break;
    //     case 'price':
    //         setData(props.data.price)
    //         break;
    //     case 'weight':
    //         setData(props.data.weight)
    //         break;
    //     case 'short_description':
    //         setData(props.data.short_description)
    //         break;
    //     case 'description':
    //         setData(props.data.description)
    //         break;
    //     default:
    //     // code block
    // }
    // function dataSetForm(name) {
    // }
    // dataSetForm(name);

    // console.log(data);
    function lfm(e, type, options) {
        let button = e.target;
        var route_prefix =
            options && options.prefix ? options.prefix : "/filemanager";
        var target_input = document.getElementById(
            button.getAttribute("data-input")
        );
        var target_preview = document.getElementById(
            button.getAttribute("data-preview")
        );

        window.open(
            route_prefix + "?type=" + type || "file",
            "FileManager",
            "width=900,height=600"
        );
        window.SetUrl = function (items) {
            var file_path = items
                .map(function (item) {
                    return item.url;
                })
                .join(",");

            // set the value of the desired input to image url
            target_input.value = file_path;
            target_input.dispatchEvent(new Event("change"));

            // clear previous preview
            target_preview.innerHtml = "";

            // set or change the preview image src
            items.forEach(function (item) {
                let img = document.createElement("img");
                img.setAttribute("style", "height: 5rem");
                img.setAttribute("src", item.thumb_url);
                target_preview.appendChild(img);
            });

            // trigger change event
            target_preview.dispatchEvent(new Event("change"));
        };
    }

    const InputType = (props) => {
        const className = `form-input mt-1 block w-full`;
        if (type == "text" || type == "number") {
            return (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder || label}
                    className={className}
                    defaultValue={value}
                    // onChange={formik.handleChange}
                    // value={formik.values[value]}
                />
            );
        } else if (type == "textarea") {
            return (
                <textarea
                    name={name}
                    rows="10"
                    className={className}
                    value={value}
                    // onChange={formik.handleChange}
                    // value={formik.values[value]}
                ></textarea>
            );
        } else if (type == "checkbox") {
            return (
                <div className={`form-input block`}>
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder || label}
                        defaultValue={'1'}
                        defaultChecked={value && value =='1' ? true : false}
                    /> Yes
                </div>
            );
        } else if (type == "select") {
            return (
                <select
                    name={name}
                    className={className}
                >
                    {options.map((item, i) => (
                        <option key={i} value={item} selected={value == item ? true : false}>{optionsLabel[i]}</option>
                    ))}
                </select>
            );
        } else if (type == "file") {
            filetype = filetype ? filetype : type;
            // console.log(filetype);
            return (
                // <input type="file" className={className} name={name}
                // value={value}
                // />
                <div className={className}>
                    {filetype == "image" && (
                        <div className="mb-2">
                            {value?
                            <img src={value} className="w-32 h-32 object-contain border rounded p-1" />
                            :
                            <div className="w-32 h-32 items-center justify-center border rounded p-1 flex">
                                Pict
                            </div>
                            }
                        </div>
                    )}
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button
                                type="button"
                                data-input={`thumbnail-${name}`}
                                data-preview={`holder-${name}`}
                                className="btn btn-primary"
                                onClick={(e) => {
                                    lfm(e, filetype);
                                }}
                            >
                                <i className="fa fa-picture-o" /> Choose
                            </button>
                        </span>
                        <input
                            id={`thumbnail-${name}`}
                            className="form-control"
                            type="text"
                            name={name}
                            defaultValue={value}
                            // onChange={formik.handleChange}
                            // value={formik.values[value]}
                        />
                    </div>
                    <div
                        id={`holder-${name}`}
                        style={{ marginTop: 15, maxHeight: 100 }}
                    />
                </div>
            );
        } else if (type == "tinyMCE") {
            return (
                // HALO
                <TinyMCEForm name={name}
                value={value}
                // onChange={formik.handleChange}
                // value={formik.values[value]}
                />
            );
        } else {
            return <p>{type}</p>;
        }
    };

    return (
        <div className="mb-4">
            <label className="block">
                <span className="text-gray-700">{label}</span>
                {/* <input type={type} name={name} placeholder="Jane Doe" className="form-input mt-1 block w-full" /> */}

                <InputType />
            </label>
        </div>
    );
};

export default Form;
