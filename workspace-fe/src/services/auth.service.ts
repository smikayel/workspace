import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)
class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "auth/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.AuthToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + 'users/signup', {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
