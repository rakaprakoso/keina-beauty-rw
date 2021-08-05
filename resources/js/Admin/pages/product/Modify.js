import React, { useEffect, useState, useRef } from 'react'
import Form from '../../components/Forms/form'
import { useHistory, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Editor from 'ckeditor5-custom-build/build/ckeditor'

import { Editor as TinyMCE } from '@tinymce/tinymce-react';

const Modify = () => {

    let { id } = useParams()
    const key = 'koderahasia'

    const [data, setData] = useState(null);

    useEffect(async () => {
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
            // console.log(dataFetch.data);
        } else {
            setData(dataFetch);
            // console.log(dataFetch);
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
        },
    ]


    return (
        <div className="w-full">
            <form action="/api/admin/product" method="POST" enctype="multipart/form-data">
                <div>
                    <h2>{id}</h2>
                    {dataForm && dataForm.map((item, i) => (
                        <Form list={item}/>
                    ))
                    }
                    {/* <CKEditor
                        // config={ {
                        //     plugins: [ SourceEditing ],
                        //     toolbar: [ 'sourceEditing']
                        // } }
                        editor={Editor}
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    /> */}
                    {/* <TinyMCE
                        textareaName='description'
                        tinymceScriptSrc="/vendor/tinymce/tinymce.min.js"
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue=""
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat code | help',
                            // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    /> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Modify

