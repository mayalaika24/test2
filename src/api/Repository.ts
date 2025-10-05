import axios from 'axios';
import { toast } from 'sonner';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('user-data')
  ? `Bearer ${cookies.get('user-data').access_token}`
  : null;
const Repository = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
  headers: {
    Accept: 'application/json',
    Authorization: token,
    'Accept-Language': 'en',
  },
});

// Add a request interceptor
Repository.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Repository.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const generalError = error?.response?.data?.message || error.message;
    if (error.response?.data?.data) {
      const errors: Array<Array<string>> =
        Object.values(error.response?.data?.data) || [];
      if (errors.length) {
        toast.error(errors[0][0]);
      } else {
        toast.error(generalError);
      }
    } else {
      toast.error(generalError);
    }
    return Promise.reject(error);
  }
);

export default Repository;
