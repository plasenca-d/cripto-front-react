import axios from 'axios';
import Cookies from 'js-cookie'
const instanceWithToken = axios.create({
    baseURL: 'http://localhost:4000/api/v1/',
    // baseURL: 'https://cripto.suramericacargo.com/api/v1/'
});

instanceWithToken.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instanceWithToken;