import axios from "axios";
import { showToast } from "vant";
import { loginUser, RegisterUser } from "../types";
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3005/',
  timeout: 3000
});

export async function login(loginUser: loginUser) {
  return await axiosInstance.post('/user/login',
    loginUser
  );
}
export async function register(registerUser: RegisterUser) {
  return await axiosInstance.post('/user/register', registerUser);
}


axiosInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('token');

  if (accessToken) {
    config.headers.authorization = 'Bearer ' + accessToken;
  }
  return config;
})
axiosInstance.interceptors.response.use(
  (response) => {
    const newToken = response.headers['token'];
    if (newToken) {
      localStorage.setItem('token', newToken);
    }
    return response;
  }, async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    let { data } = error.response;
    console.log(`output->error`, error)
    if (data.statusCode === 401) {
      showToast(data.message)
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } else {
      showToast({
        position: 'top',
        message: data.message
      })
      return Promise.reject(error);
    }
  }
)

