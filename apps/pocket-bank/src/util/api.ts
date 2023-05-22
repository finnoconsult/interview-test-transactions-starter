import axios from 'axios';
import {setToken} from '../redux/reducers/AuthenticationReducer';
import {store} from '../redux/store';
import {showNotification} from './util';

const apiClient = axios.create({
  //baseURL: process.env.REST_API_URL
  baseURL: 'http://localhost:3333/api',
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if ([403].includes(error.response.status)) {
      store.dispatch(setToken(null));
      showNotification('Something bad happened! Please try to log in again!');
    }
    return error;
  }
);

export const loginCall = (userName: string | null, password: string | null) =>
  apiClient.post('/login', {
    username: userName,
    password,
  });
export const logoutCall = () => apiClient.post('/logout');

export const getApiStatus = () => apiClient.get('/health');

export const getTransactions = () => apiClient.get('/banking/transactions');
export const setTokenForRequests = (token: string | null) => {
  apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
};
