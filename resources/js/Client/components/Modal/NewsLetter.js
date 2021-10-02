import { React, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineLoading3Quarters, AiOutlineCloseCircle, AiOutlineCheck } from "react-icons/ai";
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik'
import axios from 'axios';
import { useCookies } from 'react-cookie';

let emailSchema = yup.object().shape({
    email: yup.string().email().required(),
});

const customStyles = {
    content: {
        top: '50%',
        left: '10%',
        width: '80%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(0, -50%)',
        padding: '0',
        zIndex: 1000,
    },
};

Modal.setAppElement('#root');

const NewsLetter = (
    // { openModal, submitted, setIsOpen }
) => {
    const [cookies, setCookies] = useCookies(['newsletter']);
    const [isOpen, setIsOpen] = useState(false);

    function closeModal(change = false, email = false) {
        if (change) {
            var duration = email ? 60 * 60 * 24 * 5000 : 60 * 60 * 5;
            setCookies('newsletter', true, { path: '/', maxAge: duration });
            setIsOpen(false)
        }
    }

    useEffect(async () => {
        await timeout(5000)
        if (cookies.newsletter != 'true') {
            setIsOpen(true)
        }
    }, [])
    return (
        <>
            <Modal
                isOpen={isOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                shouldCloseOnOverlayClick={false}
            >
                <NewsLetterContent closeModal={closeModal} setCookies={setCookies} />
            </Modal>
        </>
    )
}

const NewsLetterContent = ({ closeModal, setCookies }) => {
    return (
        <div className="">
            <div className="w-full bg-primary p-16 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 transform -mr-6 z-0">
                    <svg width={500} height={500} viewBox="0 0 236 234" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <path id="a" d="M0 0h236v234H0z" />
                        </defs>
                        <g transform="rotate(-180 118 117)" fill="none" fillRule="evenodd">
                            <mask id="b" fill="#fff">
                                <use xlinkHref="#a" />
                            </mask>
                            <path d="M1 234c-129.786 0-235-105.214-235-235S-128.786-236 1-236c129.788 0 235 105.214 235 235S130.788 234 1 234z" stroke="#4A5568" strokeWidth=".704" mask="url(#b)" />
                            <path d="M-.5 217C-120.62 217-218 119.175-218-1.5S-120.62-220-.5-220C119.623-220 217-122.175 217-1.5S119.623 217-.5 217z" stroke="#4A5568" strokeWidth=".688" mask="url(#b)" />
                            <path d="M.999 199C-110.011 199-200 109.01-200-1.999-200-113.009-110.01-203 .999-203 112.009-203 202-113.008 202-1.999 202 109.011 112.008 199 .999 199z" stroke="#4A5568" strokeWidth=".672" mask="url(#b)" />
                            <path d="M.5 182C-100.844 182-183 99.396-183-2.5S-100.844-187 .5-187 184-104.396 184-2.5 101.844 182 .5 182z" stroke="#4A5568" strokeWidth=".657" mask="url(#b)" />
                            <path d="M1 166c-92.23 0-167-74.77-167-167S-91.23-168 1-168c92.233 0 167 74.77 167 167S93.233 166 1 166z" stroke="#4A5568" strokeWidth=".641" mask="url(#b)" />
                            <path d="M1.499 149C-81.066 149-148 81.62-148-1.499-148-84.619-81.066-152 1.499-152 84.066-152 151-84.618 151-1.499 151 81.621 84.066 149 1.499 149z" stroke="#4A5568" strokeWidth=".625" mask="url(#b)" />
                            <path d="M1 131c-73.454 0-133-59.546-133-133 0-73.454 59.546-133 133-133 73.454 0 133 59.546 133 133 0 73.454-59.546 133-133 133z" stroke="#4A5568" strokeWidth=".609" mask="url(#b)" />
                            <path d="M-.5 115C-64.84 115-117 62.84-117-1.5S-64.84-118-.5-118 116-65.84 116-1.5 63.84 115-.5 115z" stroke="#4A5568" strokeWidth=".593" mask="url(#b)" />
                            <path d="M.999 98C-53.676 98-98 53.676-98-.999-98-55.676-53.676-100 .999-100 55.676-100 100-55.676 100-.999 100 53.676 55.676 98 .999 98z" stroke="#4A5568" strokeWidth=".578" mask="url(#b)" />
                            <path d="M.5 82C-45.062 82-82 45.064-82-.5S-45.062-83 .5-83C46.064-83 83-46.064 83-.5S46.064 82 .5 82z" stroke="#4A5568" strokeWidth=".562" mask="url(#b)" />
                            <path d="M1 63c-35.899 0-65-29.101-65-65s29.101-65 65-65S66-37.899 66-2 36.899 63 1 63z" stroke="#4A5568" strokeWidth=".546" mask="url(#b)" />
                            <path d="M1.499 46C-25.286 46-47 24.286-47-2.499-47-29.284-25.286-51 1.499-51 28.284-51 50-29.284 50-2.499 50 24.286 28.284 46 1.499 46z" stroke="#4A5568" strokeWidth=".53" mask="url(#b)" />
                            <path d="M1 30c-17.12 0-31-13.88-31-31 0-17.122 13.88-31 31-31 17.122 0 31 13.878 31 31 0 17.12-13.878 31-31 31z" stroke="#4A5568" strokeWidth=".514" mask="url(#b)" />
                            <path d="M1.5 13C-6.507 13-13 6.509-13-1.5S-6.507-16 1.5-16C9.509-16 16-9.509 16-1.5S9.509 13 1.5 13z" stroke="#4A5568" strokeWidth=".498" mask="url(#b)" />
                        </g>
                    </svg>
                </div>
                <div className="container mx-auto z-10 relative row">
                    <div className="col-lg-8 flex w-full order-2 lg:order-1">
                        <div className="my-4 lg:my-auto">
                            <span className="xl:text-xl lg:text-xl text-center xl:text-left text-gray-300 inline-block w-full">Berlangganan NewsLetter</span>
                            <h1 className="xl:text-4xl lg:text-4xl text-center xl:text-left text-2xl text-white font-bold pb-8">Tetap Update Untuk Koleksi Baru & Penawaran Khusus</h1>
                            <div className="flex items-center mx-auto xl:mx-0 justify-between lg:mx-auto w-10/12 border-gray-400 z-10">
                                <InputEmail closeModal={closeModal} />
                            </div>
                            <div className="flex w-full">
                                <span className="mx-auto lg:ml-0 text-center xl:text-left text-white underline my-4 inline-block cursor-pointer"
                                    onClick={() => (
                                        closeModal(true, false)
                                    )}>
                                    Tidak, Terima Kasih</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 block w-full order-1 lg:order-2">
                        <div className="embed-responsive responsive-1by1">
                            <img className="object-cover object-center left-0 rounded" src="/images/newsletter.jpg" alt="Newsletter" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const InputEmail = ({ closeModal }) => {
    return (
        <Formik
            initialValues={{
                email: '',
            }}
            validationSchema={emailSchema}
            onSubmit={async (values) => {
                const formData = new FormData();
                formData.append('email', values.email);
                formData.append('newsLetter', true);
                const res = await axios.post('/api/joincampaign', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    console.log(response)
                    return response
                }).catch(error => {
                    return error.response
                });
                if (res.status == '200') {
                    closeModal(true, true)
                } else {
                }
            }}
            render={({ values, errors, touched, setFieldValue }) => (
                <Form className="w-full">
                    <div className="flex w-full">
                        <Field placeholder="Enter Your Email"
                            className="align-middle p-2 bg-transparent focus:outline-none text-white w-11/12 border-gray-400
                            border focus:border-opacity-0 flex-grow" id="email" aria-label="email" name="email"
                        />
                        <button type="submit" className="inline-block align-middle ml-2">
                            <div className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width={30} height={30} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#CBD5E0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={5} y1={12} x2={19} y2={12} />
                                    <line x1={15} y1={16} x2={19} y2={12} />
                                    <line x1={15} y1={8} x2={19} y2={12} />
                                </svg>
                            </div>
                        </button>
                    </div>
                    {errors.email && touched.email ? (
                        <div className="mb-4 text-red-600 text-sm">{errors.email}</div>
                    ) : null}
                </Form>
            )}
        />
    )
}

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const LoadingResignSubmit = () => {
    return (
        <>
            <div className="flex flex-col items-center p-8">
                <AiOutlineLoading3Quarters className="animate-spin text-4xl mb-4" />
                Loading
            </div>
        </>
    )
}
const ResignSubmitted = ({ closeModal, success }) => {
    return (
        <>
            <button className="flex ml-auto text-2xl text-red-700" onClick={closeModal}><AiOutlineCloseCircle /></button>
            {success &&
                success ?
                <div className="flex flex-col items-center p-8">
                    <AiOutlineCheck className="text-4xl mb-4 text-green-700" />
                    Submitted
                </div>
                :
                <div className="flex flex-col items-center p-8">
                    <AiOutlineCloseCircle className="text-4xl mb-4 text-red-600" />
                    Failed
                </div>
            }
        </>
    )
}

export default NewsLetter
