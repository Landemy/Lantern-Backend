import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://api.lantern.academy'
});

export default axiosInstance;

