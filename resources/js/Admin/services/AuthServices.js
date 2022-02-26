import HttpService from './HttpService';
export const RegisterUserService = (credentials) => {
    const http = new HttpService();
    let signupUrl = "users/register";
    return http.postData(credentials, signupUrl).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;
    })
}
export const LoginUserService = (credentials) => {
    const http = new HttpService();
    let loginUrl = "login";
    return http.postData(credentials, loginUrl).then((data) => {
        // console.log("Login Sek");
        // console.log(data);
        return data;
    }).catch((error) => {
        return error;
    })
}
export const LogOutUserService = () => {
    console.log("Log Out Service");
    const http = new HttpService();
    let url = "logout";
    const tokenId = "accessToken";
    return http.postData([],url, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;
    })
}
