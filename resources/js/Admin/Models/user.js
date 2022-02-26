import axios from "axios";
import { useHistory } from "react-router-dom";
class User {
  constructor() {
    this.init();
  }

  init() {
    this.name = localStorage.getItem("userName");
    this.email = localStorage.getItem("userEmail");
    this.accessToken = localStorage.getItem("accessToken");
    this.loggedIn = localStorage.getItem("userLoggedIn");
    // this.history = useHistory();
  }

  /**
   *
   * @param data object
   * @param data.name string
   * @param data.email string
   * @param callback function
   */
  authenticated(data, callback = null) {
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("userLoggedIn", true);

    this.init();

    if (callback != null) {
      callback();
    }

    // callback();
  }

  /**
   *
   * @return {boolean}
   */
  isLoggedIn() {
    return Boolean(this.loggedIn) === true;
  }

  async checkToken() {
    const headers = {
      Authorization: "Bearer " + this.accessToken,
    };
    try {
      var res = await axios({
        url: "http://localhost:8000/api/profile",
        method: "get",
        timeout: 8000,
        headers: headers,
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Remove all user's data from local storage
   */
  destroy() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLoggedIn");
  }

  /**
   *
   * @param callback function
   */
  logout(callback = null) {
    this.destroy();
    if (callback != null) {
      callback();
    }
  }
}

export default new User();
