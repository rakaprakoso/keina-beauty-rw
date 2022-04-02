import axios from "axios"

const {MIX_API_URL} = process.env
export default class HttpService {
    // url = `${MIX_API_URL}`;
    url = "http://localhost:8000/api";
    postData = async (item, added_url, tokenId = "", method = "POST") => {
        const token = await localStorage.getItem(tokenId);
        const requestOptions = this.postRequestOptions(token, item,method);
        return fetch(this.url + "/" + added_url, requestOptions).then(
            (response) => response.json()
        );
    };
    getData = async (added_url, tokenId = "") => {
        const token = await localStorage.getItem(tokenId);
        const requestOptions = this.getRequestOptions(token);
        console.log(token);
        console.log(requestOptions);
        if (token) {
            return fetch(this.url + "/" + added_url, requestOptions).then(
                (response) => response.json()
            );
        }
        return { success: false };
    };

    getDataClient = async (added_url) => {
        const requestOptions = this.getRequest();
            return fetch(this.url + "/" + added_url, requestOptions).then(
                (response) => response.json()
            );
    };

    getDataAdmin = async (added_url, tokenId = "") => {
        const token = await localStorage.getItem(tokenId);
        const requestOptions = this.getRequestOptions(token);
        if (token) {
            return await axios.get(this.url + "/" + added_url, requestOptions).then(
                function (response) {
                    return response;
                }
            );
        }
        return { success: false };
    };

        getRequest = () => {
            let requestOptions = {
                method: "GET",
            };
            return requestOptions;
        };

        getRequestOptions = (token) => {
            let requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-type": "application/json",
                },
            };
            return requestOptions;
        };
    postRequestOptions = (token, item, method) => {
        var headers;
        if (token) {
            headers = {
                Authorization: "Bearer " + token,
                "Content-type": "application/json",
            };
        } else {
            headers = {
                "Content-type": "application/json",
            };
        }
        let requestOptions = {
            method: method,
            headers: headers,
            body: JSON.stringify(item),
        };

        return requestOptions;
    };
}
