import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';
import axios from 'axios'

const JoinCampaign = () => {
    const formData = [
        {
            label: 'Name',
            name: 'name',
            type: 'text',
        },
        {
            label: 'Phone Number',
            name: 'phone_number',
            type: 'text',
        },
        {
            label: 'Email Address',
            name: 'email',
            type: 'email',
        },
    ]

    const [submitted, setSubmitted] = useState(null);

    return (
        <>
            <div className="heading bg-gray-200 py-14">
                <div className="page-wrapper">
                    <h1 className="text-center text-4xl font-bold">
                        Join Campaign
                    </h1>
                </div>
            </div>
            <div className="page-wrapper py-10">
                <div>
                    <div className="block mx-0 lg:mx-6">
                        {/* <form action="/api/joincampaign" method="POST"> */}
                        <div className="mx-0 lg:mx-10 p-10 rounded shadow-lg">
                            <div className="row">
                            <div className="col-lg-12">
                                    <Formik
                                        initialValues={{
                                            name: '',
                                            phone_number: '',
                                            email: '',
                                        }}
                                        onSubmit={async (values) => {
                                            const res = await axios.post('/api/joincampaign', values);
                                            console.log(res.data);
                                            if (res.data == "success") {
                                                setSubmitted(true)
                                                await new Promise((r) => setTimeout(r, 10000));
                                                setSubmitted(null)
                                            }
                                            // alert(JSON.stringify(values, null, 2));
                                        }}
                                    >
                                        <Form>
                                            {formData.map((item, i) => (
                                                <>
                                                    <label htmlFor={item.name} className="text-gray-600 font-light">{item.label}</label>
                                                    <Field id={item.name} required name={item.name} type={item.type} placeholder={`Enter Your ${item.label}`} className="w-full mt-2 mb-6 px-4 py-2 border rounded-sm text-gray-700 focus:outline-none focus:border-primary text-sm" />
                                                </>
                                            ))}
                                            {/* <label htmlFor="firstName">First Name</label>
                                                <Field id="firstName" name="firstName" placeholder="Jane" />

                                                <label htmlFor="lastName">Last Name</label>
                                                <Field id="lastName" name="lastName" placeholder="Doe" />

                                                <label htmlFor="email">Email</label>
                                                <Field
                                                    id="email"
                                                    name="email"
                                                    placeholder="jane@acme.com"
                                                    type="email"
                                                /> */}
                                            <button className="btn btn-primary" type="submit">Submit</button>
                                        </Form>
                                    </Formik>

                                    {submitted &&
                                        <div className="w-full bg-green-300 p-1 text-center rounded">
                                            Congratulations! You have successfully joined our campaign.
                                        </div>
                                    }


                                    {/* <button className="btn btn-primary" type="submit">
                                            Submit
                                        </button> */}
                                </div>
                            <div className="col-lg-12 flex">
                                <img src='/images/benefit_campaign.jpeg' className='lg:w-1/2 w-full mx-auto' />
                            </div>

                            </div>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default JoinCampaign
