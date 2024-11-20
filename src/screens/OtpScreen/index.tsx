import React, {useState} from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {Button} from 'react-native-paper';
import OtpInputs from 'react-native-otp-inputs';
import {dataServer} from '../../utils/axios';

const OtpScreen = ({navigation, route}:any) => {
  const colorScheme = useColorScheme();
  const [otp, setOtp] = useState('');

  const isDarkMode = colorScheme === 'dark';

  const {email, password, name, phone} = route.params; // Ensure these parameters are passed during navigation

  const handleVerifyOtp = async () => {
    console.log('Entered OTP:', otp);
  
    if (!otp || otp.length !== 6) {
      console.error('Invalid OTP. Please ensure it is 6 digits.');
      return;
    }
  
    try {
      console.log('Request Payload:', { email, password, name, phone, otp });
      const response = await dataServer.post('/auth/verifyOTP', {
        email,
        password,
        name,
        phone,
        otp,
      });
  
      console.log('Response:', response);
  
      if (response.data.message === 'Trial started successfully.') {
        navigation.navigate('DrawerScreens');
        console.log('Sign-up successful, navigating to Home.');
      } else {
        console.error('Login failed:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Verification API error:', error.message);
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        //@ts-ignore
        console.error('Server error:', error.response?.data || 'Unknown server error');
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  
  
  // const handleResendOtp = async () => {
  //   console.log('Resend OTP triggered');
  //   try {
  //     const response = await dataServer.post('/auth/resend-otp', {
  //       email,
  //     });
  
  //     console.log('OTP resent:', response.data.message);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error('Resend OTP error:', error.message);
  //     } else if (typeof error === 'object' && error !== null && 'response' in error) {
  //       console.error('Server error:', (error as any).response?.data || 'Unknown server error');
  //     } else {
  //       console.error('Unexpected error:', error);
  //     }
  //   }
  // };
  

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#FFFFFF'},
      ]}>
      <Text style={[styles.title, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
        Verify Your Email
      </Text>
      <Text
        style={[
          styles.description,
          {color: isDarkMode ? '#AAAAAA' : '#333333'},
        ]}>
        An OTP has been sent to your email. Please enter it below to verify your
        account.
      </Text>

      <OtpInputs
        handleChange={code => setOtp(code)}
        numberOfInputs={6}
        inputStyles={[
          styles.otpInput,
          {
            backgroundColor: isDarkMode ? '#333333' : '#EEEEEE',
            color: isDarkMode ? '#FFFF' : '#000',
          },
        ]}
        autofillFromClipboard={false}
      />

      <Button
        mode="contained"
        onPress={handleVerifyOtp}
        style={styles.verifyButton}
        labelStyle={{color: '#FFFFFF'}}
        buttonColor="#e67e22">
        Verify OTP
      </Button>

       
      <Button
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        labelStyle={{color: isDarkMode ? '#AAAAAA' : '#007AFF'}}>
        Back to Signup
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  otpInput: {
    width: 40,
    height: 50,
    marginHorizontal: 4,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  verifyButton: {
    width: '80%',
    marginVertical: 16,
    borderRadius: 8,
  },
  resendButton: {
    width: '80%',
    borderRadius: 8,
    borderColor: '#007AFF',
    borderWidth: 1,
    marginVertical: 8,
  },
  backButton: {
    marginTop: 16,
  },
});

export default OtpScreen;
