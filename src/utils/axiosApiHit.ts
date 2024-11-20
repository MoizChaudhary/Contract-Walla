import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance';
 
export const handleLoginAPI = async ({email, password}: any) => {
  try {
    console.log('Call Working',email);

    // const response = await axiosInstance.post('/auth/login', {
    //   email,
    //   password,
    
    //  });

    // if (response.status === 200 || response.status === 201) {
    //   const authToken = response.data.token;

    //   // Store the token in AsyncStorage
    //   await AsyncStorage.setItem('authToken', authToken);

    //   console.log('Logged in successfully');
    //   // navigation.navigate(NavigationRoute.Home);
    //   console.log('navigation is not working');
    //   return response;
    // } else {
    //   return response;
    // }
  } catch (error) {
    console.error('Error Hitting API', error);
  }
};

export const handleSignUpAPI = async ({email, password, phone, name, }: any) => {
  try {
    console.log('Call Working');
 
    const response = await axiosInstance.post('/auth/signup', {
      email,
      password,
      name,
      phone,
       
    });

    if (response.status === 200 || response.status === 201) {
      console.log('Signup successful.');
      return response; // Returning response if successful
    } else {
      console.log('Error hitting API:', response);
      return response; // Return the response even if the status isn't 200/201
    }
  } catch (error) {
    console.error('Error hitting API:', error);
    throw error; // Throw error to be caught by the caller
  }
};

// export const handleSignUpAPI = async ({ email, password, phone, name }) => {
//   try {
//     const response = await axiosInstance.post('/auth/signup', { email, password, name, phone });
//     if (response.status === 200 || response.status === 201) {
//       return response;
//     } else {
//       return response;
//     }
//   } catch (error) {
//     throw error;
//   }
// };

export const handleSignUpVerifyOTPAPI = async ({
  email,
  password,
  phone,
  name,
  otp,
}: any) => {
  try {
    const response = await axiosInstance.post('/auth/verifyOTP', {
      email,
      password,
      name,
      phone,
      otp,
    });

    if (response.status === 200 || response.status === 201) {
      console.log('OTP verification successful.');
      return response;
    } else {
      console.log('Error hitting API');
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

export const handleForgetPassOTPAPI = async ({email}: any) => {
  try {
    const response = await axiosInstance.post('/auth/forgetPassOTP', {
      email,
    });

    if (response.status === 200 || response.status === 201) {
      console.log('OTP sent for password reset.');
      return response;
    } else {
      console.log('Error hitting API');
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

export const handleCheckOTP = async ({email, otp}: any) => {
  try {
    const response = await axiosInstance.post('/auth/checkOTP', {
      email,
      otp,
    });

    if (response.status === 200 || response.status === 201) {
      console.log('OTP verification successful.');
      return response;
    } else {
      console.log('Error hitting API');
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

export const handleForgetPassAPI = async ({email, password, otp}: any) => {
  try {
    const response = await axiosInstance.post('/auth/forgetPassword', {
      email,
      password,
      otp,
    });

    if (response.status === 200 || response.status === 201) {
      console.log('Password reset successful.');
      return response;
    } else {
      console.log('Error hitting API');
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

export const handleGetSummary = async ({caselawContent}: any) => {
  try {
    const response = await axiosInstance.post('/summary', {caselawContent});

    if (response && (response.status === 200 || response.status === 201)) {
      console.log('Summary generation successful.');
      return response;
    } else {
      console.log(
        `Error generating summary: ${response?.data?.error || 'Unknown error'}`,
      );
      return response;
    }
  } catch (e) {
    console.error('Error hitting API', e);
  }
};

export const handleGetUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/user');

    if (response.status === 200 || response.status === 201) {
      console.log('User info retrieval successful.');
      return response;
    } else {
      console.log(`Error fetching user info: ${response.data.error}`);
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

// Other API functions continue similarly...

export const handleGetCaseLaws = async ({obj}: any) => {
  try {
    const params = new URLSearchParams(obj).toString();
    const response = await axiosInstance.get(`/content?${params}`);

    if (response.status === 200 || response.status === 201) {
      console.log('Citations search successful.');
      return response;
    } else {
      console.log(`Error extracting case laws: ${response.data.error}`);
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

// Additional API methods here

export const handleUpdateUserInfo = async ({name, password}: any) => {
  try {
    if (name && password) {
      const response = await axiosInstance.put('/user/update', {
        name,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        console.log('User data update successful.');
        return response;
      } else {
        console.log(`Error updating user data: ${response.data.error}`);
        return response;
      }
    } else {
      console.log('Name and Password are required.');
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

// chat
export const handleCreateChatAPI = async () => {
  try {
    const response = await axiosInstance.post('/chat/new');

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log(`Error Hiting api : ${response.data.error}`);
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
    return;
  }
};

export const handleGetAllChatsAPI = async () => {
  try {
    const response = await axiosInstance.get('/chat/all');

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log(`Error Hiting api : ${response.data.error}`);
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

export const handleGetGroupedChatsAPI = async () => {
  try {
    const response = await axiosInstance.get('/chat/grouped');

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log(`Error Hiting api : ${response.data.error}`);
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

export const handleChatHistoryAPI = async (chatId: String) => {
  try {
    const response = await axiosInstance.get(`/chat/${chatId}`);

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log(`Error Hiting api : ${response.data.error}`);
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

export const handleDeleteChatByIdAPI = async (chatId: String) => {
  try {
    const response = await axiosInstance.delete(`/chat/${chatId}`);

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log(`Error Hiting api : ${response.data.error}`);
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

interface SendMessageParams {
  chatId: string;
  imageUrl?: string;
  message?: string;
  detailLevel?: string;
}

export const handleSendMessageToChatAPI = async ({
  chatId,
  imageUrl,
  message,
  detailLevel,
}: SendMessageParams) => {
  try {
    const response = await axiosInstance.post(`/chat/${chatId}/message`, {
      imageUrl: imageUrl,
      message: message,
      detailLevel: detailLevel,
    });

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log(`Error Hiting api : ${response.data.error}`);
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

export const handleSetChatTitleAPI = async (chatId: String, title: String) => {
  try {
    const response = await axiosInstance.put(`/chat/${chatId}/title`);

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log(`Error Hiting api : ${response.data.error}`);
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

// payment

export const handleStartTrialAPI = async (email: String) => {
  try {
    const response = await axiosInstance.post('/payment/start-trial');

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log(`Error Hiting api : ${response.data.error}`);
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};

export const handleValidatePaymentbyIdAPI = async (email: String) => {
  try {
    const response = await axiosInstance.post('/payment/validate-payment');

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log('Error Hiting api');
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};
export const handleGetPaymentDetailsByIdAPI = async (email: String) => {
  try {
    const response = await axiosInstance.post('/payment/get-payment-details');

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log('Error Hiting api');
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};
export const handleSetIsPaidAPI = async (email: String) => {
  try {
    const response = await axiosInstance.post('/payment/set-is-paid');

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log('Error Hiting api');
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};
export const handleGetPaymentDetailsAPI = async (email: String) => {
  try {
    const response = await axiosInstance.get('/payment/get-payment-details');

    if (response.status == 200 || response.status == 201) {
      console.log('success from api hitting');
      return response;
    } else {
      console.log('Error Hiting api');
      return response;
    }
  } catch (e) {
    console.error('Error Hitting API', e);
  }
};
