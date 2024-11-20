import axios from 'axios';
//your production url from env
// import {PROD_URL} from '../constatants/appConstants';
import {
 CommonActions,
 createNavigationContainerRef,
} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';


import AsyncStorage from '@react-native-async-storage/async-storage';


//In Case you want to move from this function to any Screen in the stack  


export const navigationRef = createNavigationContainerRef();


//Fetching accessTokken which you are saving on login
const UseAccessToken = async () => {
 const user = await AsyncStorage.getItem('user');
 if (user) {
   const parseUser = JSON.parse(user);
   return parseUser.token;
 } else {
   return null;
 }
};
//navigation function when session expires
function navigate() {
 AsyncStorage.clear();
 if (navigationRef.isReady()) {
   navigationRef.dispatch(
     CommonActions.reset({
       index: 1,
       routes: [
         {
           name: 'AuthStack', //  add name of your stack which you want to move on 
           params: {
             screen: 'Login',// add name of your screen which you want to move on 
           },
         },
       ],
     }),
   );
 }
}


const dataServer = axios.create({
//  baseURL: PROD_URL,
 baseURL: 'https://backend.contractwalla.com/api',

 timeout: 100000,
 maxBodyLength: Infinity,
 maxContentLength: Infinity,
 headers: {
   'Content-Type': 'application/json',
 },
});


dataServer.interceptors.request.use(config => {
 return new Promise((resolve, reject) => {
   NetInfo.addEventListener(async state => {
     const accessToken = await UseAccessToken();
     if (!state.isConnected) {
       return reject({message: 'No internet connection'});
     }
     if (config.data && config.data instanceof FormData) {
       config.headers['Content-Type'] = 'multipart/form-data';
     }
     if (accessToken) {
       config.headers.Authorization = `Bearer ${accessToken}`;
     }
     return resolve(config);
   });
 });
});
dataServer.interceptors.response.use(
 response => {
   return response.data;
 },
 error => {
   if (error?.response?.status === 401) {
     navigate();
   }
   return Promise.reject(error);
 },
);


export {dataServer};
// const LoginFunction= async (email,password) => {
//     //here you see the dataServer.post function you use any type of method in it like //put, delete etc. Just like dataServer.put and dataServer.delete  
//             try {
//            const _loginApi: any = await dataServer.post(
//              '/auth/login',
//              {
//     // pass parameters like this 
//                username: email,
//                password: password,
//              },
//            );
//     // here you will getting the response
//            console.log('Data', _loginApi);
//           }
//           catch (e: any) {
//             //Here you are getting an error.
//                    console.log('Error', e.response);
//                        }
                    
//          }