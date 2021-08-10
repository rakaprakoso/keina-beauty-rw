import React, { useEffect, useState, useRef } from 'react'
import Form from '../../components/Forms/form'
import { useHistory, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Editor as TinyMCE } from '@tinymce/tinymce-react';

const Modify = () => {

    let { id, method } = useParams()
    const key = 'koderahasia'
    const basePath = '/api/admin/product'
    const [data, setData] = useState(null)
    const [path, setPath] = useState(basePath)

    useEffect(async () => {
        if(method === 'edit'){
            const dataFetch = await axios
                .get(`/api/admin/product/${id}?key=${key}`)
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
                setPath(basePath + '/' + dataFetch.data.id)
                // console.log(dataFetch.data);
            } else {
                setData(dataFetch);
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
    ]







    return (
        <div className="w-full p-10 bg-white shadow">
            <form action={path}
                // "/api/admin/product"
                method="POST" enctype="multipart/form-data">
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
    )
}

export default Modify

