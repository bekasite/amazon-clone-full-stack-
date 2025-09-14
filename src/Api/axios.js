import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://amazon-back-end-ioby.onrender.com"
})

export {axiosInstance}