import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  useColorScheme, // Hook to detect the theme
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
//@ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import Material Icons
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; // Import responsive screen functions
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../ContextApi/ThemeContext'; // Adjust the import path
 import { dataServer } from '../../utils/axios';

 

const ForgotPassword = () => {
  const handleForgetPassOTPAPI = async (email: string) => {
    try {
       const response = await dataServer.post('/auth/forgetPassOTP', {email});
      if (response.status === 200 || response.status === 201) {
        console.log('Success from API:', response.data);
        return response.data;
      } else {
        console.log('Error hitting API:', response);
        return response;
      }
    } catch (error) {
      console.error('Error hitting API:', error);
      return null;
    }
  };
  const colorScheme = useColorScheme(); // Detect the color scheme
  const isDarkMode = colorScheme === 'dark';
  const navigation: any = useNavigation();
  const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;

  const signUpValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.container, themeStyles]}>
      <StatusBar
        backgroundColor={isDarkMode ? '#000' : 'white'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, isDarkMode && {color: '#ffffff'}]}>
          Reset Your Password
        </Text>
        <Text style={[styles.signInLink, isDarkMode && {color: '#ffffff'}]}>
          Remember your password?{' '}
          <Text
            onPress={() => {
              navigation.navigate('logIn');
            }}
            style={styles.signIn}>
            Sign In!
          </Text>
        </Text>

        <Text style={[styles.orText, isDarkMode && {color: '#ffffff'}]}>
          or
        </Text>

        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={async values => {
            console.log('Submitting email:', values.email);
            const response = await handleForgetPassOTPAPI(values.email);
            console.log('API Response:', response);
            if (response && response.message === "OTP sent to your email. Please verify to complete registration.") {
              console.log('OTP sent successfully:', response);
              navigation.navigate('OtpScreen',{email: values.email,});
              // Navigate or show success message here
            } else {
              console.log('Failed to send OTP.');
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <TextInput
                label="Email"
                mode="outlined"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email ? true : false}
                style={[styles.input, isDarkMode && {backgroundColor: '#333'}]}
                textColor={isDarkMode ? '#ffffff' : '#000000'}
                outlineColor={isDarkMode ? '#ffffff' : '#000000'}
                theme={{
                  colors: {
                    primary: isDarkMode ? '#e67e22' : '#666666',
                    text: isDarkMode ? '#ffffff' : '#000000',
                    placeholder: isDarkMode ? '#cccccc' : '#666666',
                    background: isDarkMode ? '#333' : '#fff',
                  },
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="email-outline"
                        size={20}
                        color={isDarkMode ? 'white' : 'black'}
                      />
                    )}
                  />
                } // Left Icon
              />
              {touched.email && errors.email && (
                <Text style={[styles.errorText, isDarkMode && {color: 'red'}]}>
                  {errors.email}
                </Text>
              )}

              <TouchableOpacity
                style={[
                  styles.signUpButton,
                  isDarkMode && {backgroundColor: '#e67e22'},
                ]}
                //@ts-ignore
                onPress={handleSubmit}>
                <Text
                  style={[styles.SignUpText, isDarkMode && {color: '#ffffff'}]}>
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('4%'),
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: hp('2%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: hp('1%'),
    color: '#000000',
  },
  signInLink: {
    alignSelf: 'center',
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
    color: '#000000',
  },
  signIn: {
    color: '#e67e22',
    fontWeight: 'bold',
  },
  orText: {
    alignSelf: 'center',
    fontSize: wp('4%'),
  },
  formContainer: {
    marginVertical: hp('2%'),
  },
  input: {
    marginBottom: hp('1.2%'),
  },
  signUpButton: {
    marginTop: hp('2%'),
    backgroundColor: '#e67e22',
    padding: wp('3%'),
    borderRadius: wp('1%'),
    justifyContent: 'center',
  },
  SignUpText: {
    alignSelf: 'center',
    color: '#ffff',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: wp('3%'),
    color: 'red',
    marginBottom: hp('0.5%'),
  },
  darkTheme: {
    backgroundColor: '#000000',
  },
  lightTheme: {
    backgroundColor: '#ffffff',
  },
});

export default ForgotPassword;
