import React, { useState } from 'react'

import { BsTrash } from "react-icons/bs";
import axios from "axios";

const CartItem1 = (props, cb) => {
    console.log(props.data);
    // console.log(props.quantity);
    const { name, price, thumbnail_img, id } = props.data;
    // const quantity2 = quantity;
    const [qty, setQty] = useState(props.quantity);

    const [totalPrice, setTotalPrice] = useState(qty * price);
    cb = totalPrice;
    console.log(cb);

    function deleteCart(e) {
        // e.preventDefault();
        // console.log(e.target.attributes.getNamedItem('data-id'))
        let tag = e.currentTarget.dataset.id;
        // console.log(tag);
        props.parentCallback(tag)
    }

    return (
        <>
            <tr className="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0">
                <td className="px-4 py-4">
                    {/* <input className="inline-block mr-3" type="checkbox" name={`product-1`} id="" /> */}
                    <img className="h-10 w-10 rounded-full inline-block mr-4 overflow-hidden" src={thumbnail_img} alt={name} />
                    {name}
                </td>
                <td className="px-4 py-4">Rp. {price}</td>
                <td className="px-4 py-4">
                    <input type="hidden" name="product_id[]" value={id} />
                    <input type="number" name={`qty[]`} value={qty} id={`qty-`} onChange={(e) => { setQty(e.target.value); setTotalPrice(e.target.value * price) }} />
                </td>
                <td className="px-4 py-4 relative">
                    <span> Rp. {totalPrice}</span>

                    <button type="button" className="text-red-500 absolute right-0 h-6 pr-4" data-id={id} onClick={deleteCart}>
                        <BsTrash />
                    </button>
                </td>

            </tr>
        </>
    )
}

export default CartItem1
