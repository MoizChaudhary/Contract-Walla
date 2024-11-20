// utils/axiosInstance.ts
import axios, {InternalAxiosRequestConfig, AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const navigation: any = useNavigation();


const axiosInstance = axios.create({
  baseURL:'https://backend.contractwalla.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Exclude signup endpoint from interceptor logic
    if (!config.url?.startsWith('/auth')) {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken) {
        config.headers.Authorization = `${authToken}`;
      }
    }

    console.log('config', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    const {status, data} = error.response || {};

    // Handle specific error conditions
    if (status === 400 && data?.message === 'Invalid token') {
      Alert.alert(
        'Session expired',
        'Your session is invalid. Please log in again.',
      );
      navigation.navigate('signUp');

      return;
    }

    if (
      status === 401 &&
      data?.message === 'Access denied, no token provided'
    ) {
      Alert.alert(
        'Authentication Required',
        'Please log in to access this content.',
      );
      navigation.navigate('signUp');

      return;
    }

    // If the error doesn't match the above conditions, return the error response
    return Promise.resolve(error.response); // Allows handling error in `then` block instead of `catch`
  },
);

export default axiosInstance;
