import React, { useState } from 'react'
import TinyMCEForm from './TinyMCE'

const Form = (props, cb) => {
    console.log(props.list);
    // console.log(props.data);

    // const [data, setData] = useState(null);

    const { name, label, type, value } = props.list;

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
            return (
                <input type="file" className={className} name={name}
                value={value}
                />
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
