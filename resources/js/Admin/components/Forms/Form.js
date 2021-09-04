import React, { useState } from 'react'
import TinyMCEForm from './TinyMCE'

const Form = (props, cb) => {
    // console.log(props.list);

    // const [data, setData] = useState(null);

    var { name, label, type, value, filetype } = props.list;
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
        var route_prefix = (options && options.prefix) ? options.prefix : '/filemanager';
        var target_input = document.getElementById(button.getAttribute('data-input'));
        var target_preview = document.getElementById(button.getAttribute('data-preview'));

        window.open(route_prefix + '?type=' + type || 'file', 'FileManager', 'width=900,height=600');
        window.SetUrl = function (items) {
            var file_path = items.map(function (item) {
                return item.url;
            }).join(',');

            // set the value of the desired input to image url
            target_input.value = file_path;
            target_input.dispatchEvent(new Event('change'));

            // clear previous preview
            target_preview.innerHtml = '';

            // set or change the preview image src
            items.forEach(function (item) {
                let img = document.createElement('img')
                img.setAttribute('style', 'height: 5rem')
                img.setAttribute('src', item.thumb_url)
                target_preview.appendChild(img);
            });

            // trigger change event
            target_preview.dispatchEvent(new Event('change'));
        };
    };

    const InputType = (props) => {
        const className = `form-input mt-1 block w-full`;
        if (type == 'text' || type == 'number') {
            return (
                <input type={type} name={name} placeholder={label} className={className}
                    defaultValue={value}
                />
            )
        } else if (type == 'textarea') {
            return (
                <textarea name={name} rows="10" className={className}
                    value={value}
                >

                </textarea>
            )
        } else if (type == 'file') {
            filetype = filetype ? filetype : type;
            // console.log(filetype);
            return (
                // <input type="file" className={className} name={name}
                // value={value}
                // />
                <div className={className}>
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button type="button" data-input={`thumbnail-${name}`} data-preview={`holder-${name}`} className="btn btn-primary" onClick={(e) => {
                                lfm(e, filetype);
                            }}>
                                <i className="fa fa-picture-o" /> Choose
                            </button>
                        </span>
                        <input id={`thumbnail-${name}`} className="form-control" type="text" name={name} defaultValue={value} />
                    </div>
                    <div id={`holder-${name}`} style={{ marginTop: 15, maxHeight: 100 }} />
                </div>
            )
        } else if (type == 'tinyMCE') {
            return (
                // HALO
                <TinyMCEForm name={name}
                    value={value}
                />
            )
        } else {
            return (
                <p>HALOO</p>
            );
        }
    };


    return (
        <>
            <label className="block">
                <span className="text-gray-700">{label}</span>
                {/* <input type={type} name={name} placeholder="Jane Doe" className="form-input mt-1 block w-full" /> */}

                <InputType />
            </label>
        </>
    )
}



export default Form
