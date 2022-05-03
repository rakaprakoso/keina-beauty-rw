import React, { useEffect, useState, useRef } from 'react'
import Form from '../../components/Forms/form'
import { useHistory, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Editor as TinyMCE } from '@tinymce/tinymce-react';
import HttpService from '../../services/HttpService';

const Modify = () => {

    let { id, method } = useParams()
    const key = 'koderahasia'
    const basePath = '/api/admin/product'
    const [data, setData] = useState(null)
    const [path, setPath] = useState(basePath)

    // useEffect(async () => {
    //     if(method === 'edit'){
    //         const http = new HttpService();
    //         const url = `admin/product/${id}?key=${key}`;
    //         const tokenId = "accessToken";
    //         const dataFetch = await http
    //             .getDataAdmin(url, tokenId)
    //             .then((data) => {
    //                 return data;
    //             })
    //             .catch((error) => {
    //                 return error;
    //             });
    //         // console.log(dataFetch.cartSession[5]);
    //         // setRawData(dataFetch);
    //         if (dataFetch.status == 200) {
    //             setData(dataFetch.data);
    //             setPath(basePath + '/' + dataFetch.data.id)
    //             // console.log(dataFetch.data);
    //         } else {
    //             setData(dataFetch);
    //             // console.log(dataFetch);
    //         }
    //     }
    // }, []);

    useEffect(async () => {
        console.log(method)
        if (method === 'edit') {
            const http = new HttpService();
            const url = `admin/product/${id}`;
            const tokenId = "accessToken";
            const dataFetch = await http
                .getDataAdmin(url, tokenId)
                .then((data) => {
                    return data;
                })
                .catch((error) => {
                    return error;
                });
            console.log(dataFetch)
            // alert(JSON.stringify(dataFetch,null, 2))
            // console.log(dataFetch.cartSession[5]);
            // setRawData(dataFetch);
            if (dataFetch.status == 200) {
                setData(dataFetch.data.data);
                setPath(basePath + "/" + dataFetch.data.id);
            } else {
                setData(null);
                // console.log(dataFetch);
            }
        }
    }, []);

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const handleSubmit = async function (e) {
        e.preventDefault();
        var url = '';
        var methodSubmit = 'POST';
        const body = new FormData(e.target);
        console.log(body)
        var object = {};
        body.forEach((value, key) => object[key] = value);
        var bodyPost = object;
        const http = new HttpService();
        if (method === 'edit') {
            url = `admin/product/${id}`;
            methodSubmit = `PUT`;
        } else {
            url = "admin/product";
        }
        const tokenId = "accessToken";
        const data = await http.postData(bodyPost, url, tokenId, methodSubmit).then((data) => {
            return data;
        }).catch((error) => {
            return error;
        })

        // console.log(data)
        // alert(JSON.stringify(data))

        if (data.success) {
            window.location.href = "/admin/product";
        } else {
            alert("Error")
        }
    }

    const dataForm = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            value: data?.name,
        },
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            value: data?.price,
        },
        {
            name: 'discount_price',
            label: 'Discount Price',
            type: 'number',
            value: data?.discount_price,
        },
        {
            name: 'weight',
            label: 'Weight (gr)',
            type: 'number',
            value: data?.weight,
        },
        {
            name: 'short_description',
            label: 'Short Description',
            type: 'tinyMCE',
            value: data?.short_description,
        },
        {
            name: 'description',
            label: 'Long Description',
            type: 'tinyMCE',
            value: data?.description,
        },
        {
            name: 'image',
            label: 'Image',
            type: 'file',
            filetype: 'image',
            value: data?.thumbnail_img,
        },
        {
            name: 'imageGallery',
            label: 'image Gallery',
            type: 'file',
            filetype: 'image',
            value: data?.imagesArr.join(','),
        },
    ]

    return (
        <div className="px-4">
            <div className="w-full p-10 bg-white shadow rounded">
                <form
                    action={path}
                    // "/api/admin/product"
                    onSubmit={handleSubmit}
                    // method="POST" enctype="multipart/form-data"
                    >
                    {method === 'edit' ?
                        <input type="hidden" name="_method" value="put" /> : null
                    }
                    <div>
                        {dataForm && dataForm.map((item, i) => (
                            <Form list={item} />
                        ))
                        }
                        {/* <button type="button" id="lfm" onClick={(e) => {
                            lfm(e, 'lfm', 'file');
                        }} className="btn btn-primary">
                            Browser File
                        </button> */}


                        {/* {lfm('lfm','file')} */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modify

