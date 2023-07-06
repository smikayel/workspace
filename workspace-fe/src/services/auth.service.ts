import axios from "axios";

const API_URL = "http://localhost:4200/api/";

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
