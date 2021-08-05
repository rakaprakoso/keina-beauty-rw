import React, { Component, useEffect, useState } from 'react'
import CartItem1 from '../../components/CartItem/CartItem1';

const data = [0, 1, 2, 3, 5, 6];

const Cart = () => {
    // const responseData = [];
    // const [appState, setAppState] = useState({
    //     loading: false,
    //     data: null,
    //   });

    // useEffect(async () => {
    //     setAppState({ loading: true });
    //     const apiUrl = '/api/cart';
    //     await axios.get(apiUrl).then((repos) => {
    //       const responseData = data.data;
    //       setAppState({ loading: false, data: responseData });
    //       console.log(responseData);
    //     });
    //   }, [setAppState]);

    const [data, setData] = useState(null);
    const [rawData, setRawData] = useState(null);

    const [value, setValue] = useState("");

    const onChange = (event) => {
        console.log("onChange called");
        setValue(event.target.value);
    };

    useEffect(async () => {
        const dataFetch = await axios
            .get("/api/cart")
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(dataFetch.cartSession[5]);
        setRawData(dataFetch);
        setData(dataFetch.cart);
        // console.log(dataFetch);
        // console.log(rawData);
    }, []);

    const handleCallback = async (childData) =>{
        console.log(childData);

        const dataFetch = await axios
            .get(`/api/deleteCart?product_id=${childData}`)
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(dataFetch.cartSession[5]);
        setRawData(dataFetch);
        setData(dataFetch.cart);

    }

    return (
        <>
            <div className="heading bg-gray-200 py-14">
                <div className="page-wrapper">
                    <h1 className="text-center text-4xl font-bold">
                        CART
                    </h1>
                </div>
            </div>
            <div className="page-wrapper py-10">
                <div>
                    <form action="/api/toCheckout" method="POST">
                        <div className="block overflow-x-auto mx-6">

                            <table className="w-full text-left rounded-lg">
                                <thead>
                                    <tr className="text-gray-800 border border-b-0">
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3">Price</th>
                                        <th className="px-4 py-3">Quantity</th>
                                        <th className="px-4 py-3">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rawData ? rawData?.cart?.map((item, i) =>
                                        <CartItem1 data={item} quantity={rawData.cartSession[item.id]['qty']} parentCallback = {handleCallback} />
                                    ) : <tr className="p-4 border"><td colSpan={4} className="p-4 text-center">Loading</td></tr>}

                                    {rawData?.cart === null ?
                                        <tr className="p-4 border"><td colSpan={4} className="p-4 text-center">Data Not Found</td></tr>
                                        :
                                        null
                                    }

                                    {/* {data && data.map((item, i) => (
                                    <tr className="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0">
                                        <td className="px-4 py-4">
                                            <input className="inline-block mr-3" type="checkbox" name={`product-${i}`} id="" />
                                            <img className="h-10 w-10 rounded-full inline-block mr-4" src="https://keinabeauty.com/wp-content/uploads/2021/02/DSCF0891_1-600x929.jpg" alt="" />
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-4">Rp. {item.price}</td>
                                        <td className="px-4 py-4">
                                            <input type="number" name={`qty[${i}]`} value={value || rawData.cartSession[item.id]['qty']} id={`qty-${i}`} onChange={onChange}/>
                                        </td>
                                        <td className="px-4 py-4">
                                            Rp. {item.price * rawData.cartSession[item.id]['qty']}
                                        </td>

                                    </tr>))} */}

                                </tbody>
                            </table>
                            <div className="flex mt-4">
                                <div className="actions ml-auto">
                                    <a className="btn btn-outline-primary" href="/shop">
                                        Continue Shop
                                    </a>
                                    <button type="submit" className="btn btn-primary">
                                        Checkout
                                    </button>
                                    {/* <a className="btn btn-primary" href="/checkout">
                                        Checkout
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

const Checkout = () => {
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

    const [data, setData] = useState(null);
    const [rawData, setRawData] = useState(null);
    const [weight, setWeight] = useState(null);

    useEffect(async () => {
        const dataFetch = await axios
            .get("/api/cart?checkout=true")
            .then(function (response) {
                // console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(dataFetch.cartSession[5]);
        setRawData(dataFetch);
        setData(dataFetch.cart);
        // var tempWeight = 0;
        // data.forEach((item, i) => {
        //     tempWeight += rawData.cartSession[item.id]['qty'] * item.weight;
        // });
        setWeight(dataFetch.weight);
        // console.log(dataFetch);
        // console.log(rawData);
    }, []);

    const [provinces, setProvinces] = useState(null);
    const [cities, setCities] = useState(null);
    const [cost, setCost] = useState(null);


    const [totalPrice, setTotalPrice] = useState(null);

    useEffect(async () => {
        const data = {
            // id: 12,
            key: 'd534c6602dfaa12be7ad3b514305eb0a',
            type:'province',
        };

        const dataFetch = await axios
            .post("/api/rajaongkir", data)
            .then(function (response) {
                console.log(response.data.rajaongkir.results);
                return response.data.rajaongkir.results;
            })
            .catch(function (error) {
                console.log(error);
            });
        setProvinces(dataFetch);
        // console.log(provinces);
        // setData(dataFetch.cart);
        // console.log(dataFetch);
        // console.log(rawData);
    }, []);

    async function setupCities(e) {
        console.log(e.target.value);

        const data = {
            // id: 12,
            key: 'd534c6602dfaa12be7ad3b514305eb0a',
            type:'city',
            parameter:'province='+e.target.value,
        };

        const dataFetch = await axios
            .post("/api/rajaongkir", data)
            .then(function (response) {
                console.log(response.data.rajaongkir.results);
                return response.data.rajaongkir.results;
            })
            .catch(function (error) {
                console.log(error);
            });

        setCities(dataFetch);

    }
    async function setupCost(e) {
        console.log(e.target.value);

        const data = {
            // id: 12,
            key: 'd534c6602dfaa12be7ad3b514305eb0a',
            type:'cost',
            destination:e.target.value,
            weight:weight,
        };

        const dataFetch = await axios
            .post("/api/rajaongkir", data)
            .then(function (response) {
                console.log(response.data.rajaongkir.results);
                return response.data.rajaongkir.results;
            })
            .catch(function (error) {
                console.log(error);
            });
        setCost(dataFetch);

    }
    function calculateTotal(e) {
        console.log(e.target.value);
        console.log(rawData['price']['net_price']);
        console.log(e.target.selectedOptions[0].getAttribute('data-price'));

        // const data = {
        //     // id: 12,
        //     key: 'd534c6602dfaa12be7ad3b514305eb0a',
        //     type:'cost',
        //     destination:e.target.value,
        // };

        // const dataFetch = await axios
        //     .post("/api/rajaongkir", data)
        //     .then(function (response) {
        //         console.log(response.data.rajaongkir.results);
        //         return response.data.rajaongkir.results;
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        // const total = 200000;

        setTotalPrice([
            rawData['price']['net_price'] + parseInt(e.target.selectedOptions[0].getAttribute('data-price')),
            e.target.selectedOptions[0].getAttribute('data-price'),
            e.target.value,
        ]);
        console.log(totalPrice);

    }


    return (
        <>
            <div className="heading bg-gray-200 py-14">
                <div className="page-wrapper">
                    <h1 className="text-center text-4xl font-bold">
                        Checkout
                    </h1>
                </div>
            </div>
            <div className="page-wrapper py-10">
                <div>
                    <div className="block mx-6">
                        <form action="/api/createOrder" method="POST">
                            <div className="row">
                                <div className="col-lg-8">
                                    <h2 className="mb-3 text-xl">Billing Details</h2>

                                    {formData.map((item, i) => (
                                        <>

                                            <label className="text-gray-600 font-light">{item.label}</label>
                                            <input required name={item.name} type={item.type} placeholder={`Enter Your ${item.label}`} className="w-full mt-2 mb-6 px-4 py-2 border rounded-sm text-gray-700 focus:outline-none focus:border-primary text-sm" />

                                        </>
                                    ))}
                                    <label className="text-gray-600 font-light">Address</label>
                                    <textarea required name="address" rows="3" placeholder={`Enter Your Address`} className="w-full mt-2 mb-6 px-4 py-2 border rounded-sm text-gray-700 focus:outline-none focus:border-primary text-sm" />
                                    <label className="text-gray-600 font-light">Province</label>
                                    <select required name="province_id" className="bg-white w-full mt-2 mb-6 px-4 py-2 border rounded-sm text-gray-700 focus:outline-none focus:border-primary text-sm" onChange={setupCities}>
                                        <option className="py-1">Select Province</option>
                                        {provinces ? provinces?.map((item, i) =>
                                            <option className="py-1" value={item.province_id}>{item.province}</option>
                                        ) : <option className="py-1">Loading</option>}
                                    </select>


                                    <label className="text-gray-600 font-light">City</label>
                                    <select required name="city_id" className="bg-white w-full mt-2 mb-6 px-4 py-2 border rounded-sm text-gray-700 focus:outline-none focus:border-primary text-sm"
                                    onChange={setupCost}>
                                        <option className="py-1">Select City</option>
                                        {cities ? cities?.map((item, i) =>
                                            <option className="py-1" value={item.city_id}>{`${item.type} ${item.city_name}`}</option>
                                        ) : <option className="py-1">Select Province First</option>}
                                    </select>


                                </div>
                                <div className="col-lg-4">
                                    <div className="bg-gray-50 p-8">
                                        <h2 className="text-lg font-semibold mb-4">Your Order</h2>
                                        <div className="divider mb-5" />
                                        <div className="shipping-cost">
                                            <label className="">Shipping Cost</label>
                                            <select required onChange={calculateTotal} className="bg-white w-full mt-2 mb-6 px-4 py-2 border rounded-sm text-gray-700 focus:outline-none focus:border-primary text-sm">
                                            <option className="py-1">Select shipping cost</option>
                                            {cost ? cost[0]['costs'].map((item, i) =>
                                            <option className="py-1" data-price={item.cost[0].value} value={item.service}>{`${item.service} - Rp. ${item.cost[0].value}`}</option>
                                        ) : <option className="py-1">Select your address first</option>}
                                                {/* // <option className="py-1">JNE - Rp. 25.000</option>
                                                // <option className="py-1">J&T - Rp. 23.000</option>
                                                // <option className="py-1">TIKI - Rp. 27.000</option> */}
                                            </select>
                                        </div>
                                        <table className="w-full rounded-lg mb-4">
                                            <thead>
                                                <tr className="border-b">
                                                    <td>Product</td>
                                                    <td>Price</td>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {rawData ? rawData?.cart?.map((item, i) =>
                                                    <tr className="border-b">
                                                        <td>
                                                            {`${item.name} - x ${rawData.cartSession[item.id]['qty']} - ${rawData.cartSession[item.id]['qty'] * item.weight}gr`}
                                                            <input type="hidden" name="product_id[]" value={item.id}/>
                                                            <input type="hidden" name="qty[]" value={rawData.cartSession[item.id]['qty']}/>
                                                        </td>
                                                        <td>Rp. {item.price * rawData.cartSession[item.id]['qty']}</td>
                                                    </tr>
                                                ) : <tr><td>Loading</td></tr>}

                                                {rawData?.cart === null ?
                                                    <tr><td colSpan={2} className="text-center">Data Not Found</td></tr>
                                                    :
                                                    null
                                                }


                                            </tbody>
                                            <tfoot className="text-sm">
                                                <tr className="border-b">
                                                    <td><strong>Subtotal</strong></td>
                                                    <td>Rp. {rawData && rawData['price']['net_price']}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td><strong>Shipping Cost</strong></td>
                                                    <td>Rp. {totalPrice && totalPrice[1]}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td><strong>Total</strong></td>
                                                    <td>Rp. {totalPrice && totalPrice[0]}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <input required type="hidden" name="shipping_method" value={totalPrice && totalPrice[2]} />
                                        <input required type="hidden" name="weight" value={weight} />
                                        <button className="btn btn-primary w-full text-center">
                                            Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* <table className="w-full text-left rounded-lg">
                            <thead>
                                <tr className="text-gray-800 border border-b-0">
                                    <th className="px-4 py-3">Product</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Quantity</th>
                                    <th className="px-4 py-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr className="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0">
                                        <td className="px-4 py-4">
                                            <input className="inline-block mr-3" type="checkbox" name={`product-${i}`} id="" />
                                            <img className="h-10 w-10 rounded-full inline-block mr-4" src="https://keinabeauty.com/wp-content/uploads/2021/02/DSCF0891_1-600x929.jpg" alt="" />
                                            Minimalistic shop for multipurpose use
                                        </td>
                                        <td className="px-4 py-4">Rp. 200.000</td>
                                        <td className="px-4 py-4">
                                            <input type="number" name="qty" id="" />
                                        </td>
                                        <td className="px-4 py-4">
                                            Rp.400.000
                                        </td>

                                    </tr>))}

                            </tbody>
                        </table> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export { Cart, Checkout }
