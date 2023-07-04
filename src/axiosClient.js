import axios from 'axios';

const axiosClient = axios.create({
   // baseURL: 'http://192.168.100.101:80/api',
   baseURL: 'http://localhost:8000/api',
   headers:{Authorization:'Bearer '+localStorage.getItem('token')}
});

export default axiosClient;