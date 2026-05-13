import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3008/auth", 
    withCredentials: true
})