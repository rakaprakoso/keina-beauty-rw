import axios from "axios";



const dataFetch = async () => {
    return await axios
        .get("/api/cart")
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const GET_CART = "GET_CART";
export const fetchCart = () => {
    return async dispatch => {

        const data = await dataFetch();
        // alert(data.data);
        // this.toggleButton(!this.setAlert);
        dispatch({ type: GET_CART, cartData: data });
    };
};

export const ADD_CART = "ADD_CART";
export const addCart = (product_id) => {
    return async dispatch => {

        console.log(product_id)
        const product = {
            product_id: product_id,
            qty: 1,

        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        };
        const response = await fetch('/api/ajax/cart', requestOptions);

        const data = await dataFetch();
        dispatch({ type: ADD_CART, cartData: data });
    };
};

