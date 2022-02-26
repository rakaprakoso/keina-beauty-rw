import axios from "axios"
export default class HttpService {
    url = "http://localhost:8000/api";
    // url = "http://localhost:8000/api";
    postData = async (item, added_url, tokenId = "") => {
        const token = await localStorage.getItem(tokenId);
        const requestOptions = this.postRequestOptions(token, item);
        return fetch(this.url + "/" + added_url, requestOptions).then(
            (response) => response.json()
        );
    };
    getData = async (added_url, tokenId = "") => {
        const token = await localStorage.getItem(tokenId);
        const requestOptions = this.getRequestOptions(token);
        console.log("AKAN TARIK DATA");
        console.log(token);
        console.log(requestOptions);
        if (token) {
            return fetch(this.url + "/" + added_url, requestOptions).then(
                (response) => response.json()
            );
        }
        return { success: false };
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
    postRequestOptions = (token, item) => {
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
            method: "POST",
            headers: headers,
            body: JSON.stringify(item),
        };

        return requestOptions;
    };
}
