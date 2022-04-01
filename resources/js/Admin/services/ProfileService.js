import HttpService from './HttpService';
export const LoadProfile = () => {
    const http = new HttpService();
    let profileUrl = "users/view-profile";
    // const tokenId = "user-token";
    const tokenId = "accessToken";
    // const tokenId = "access_token";
    return http.postData('',profileUrl, tokenId).then(data => {
        console.log(data);
        return data;
    }).catch((error) => {
        console.log(error);
        return error;
    });
}
