import React, { useEffect, useState, useRef } from "react";
import Form from "../../components/Forms/form";
import { useHistory, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import { NumberFormat } from "../../../Client/components/Functions/NumberFormat";
import HttpService from "../../services/HttpService";
import { useFormik } from "formik";

const PostModify = () => {
    let { id, method } = useParams();
    const basePath = "/api/admin/post";
    const [data, setData] = useState(null);
    const [path, setPath] = useState(basePath);

    useEffect(async () => {
        console.log(method)
        if(method === 'edit'){
            const http = new HttpService();
            const url = `admin/post/${id}`;
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
            // console.log(dataFetch.cartSession[5]);
            // setRawData(dataFetch);
            if (dataFetch.status == 200) {
                setData(dataFetch.data);
                setPath(basePath + "/" + dataFetch.data.id);
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
            name: 'post_title',
            label: 'Title',
            type: 'text',
            value: data?.post_title,
        },
        {
            name: 'post_content',
            label: 'Content',
            type: 'tinyMCE',
            value: data?.post_content,
        },
        {
            name: 'post_image_thumbnail',
            label: 'Image',
            type: 'file',
            filetype: 'image',
            value: data?.post_image_thumbnail,
        },
    ]

    const formik = useFormik({
        initialValues: {
            post_title: '',
            post_content: '',
            post_image_thumbnail: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

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
        if(method === 'edit'){
            url = `admin/post/${id}`;
            methodSubmit = `PUT`;
        }else{
            url = "admin/post";
        }
        const tokenId = "accessToken";
        const data = await http.postData(bodyPost, url,tokenId, methodSubmit).then((data) => {
            return data;
        }).catch((error) => {
            return error;
        })

        // console.log(data)
        // alert(JSON.stringify(data))

        if (data.success){
            window.location.href = "/admin/post";
        }else{
            alert("Error")
        }
    }

    return (
        <div className="px-4">
            <div className="w-full p-10 bg-white shadow rounded">
                <h2>Create Post</h2>
                <form
                // action={path}
                onSubmit={handleSubmit}
                    // "/api/admin/product"
                    // method="POST" enctype="multipart/form-data"
                    >
                    {method === 'edit' ?
                        <input type="hidden" name="_method" value="put" /> : null
                    }
                    <div>
                        {dataForm && dataForm.map((item, i) => (
                            <Form list={item} formik={formik}/>
                        ))
                        }
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostModify;
