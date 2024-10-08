import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation: any = useNavigation();
  const colorScheme = useColorScheme(); // Detect the color scheme
  const isDarkMode = colorScheme === 'dark';
  const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;

  const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Confirm Password is required'),
    phoneNumber: Yup.string().matches(
      /^[0-9]{10,12}$/,
      'Phone number is not valid',
    ),
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.container, themeStyles]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, isDarkMode && {color: '#ffffff'}]}>
          Sign Up
        </Text>
        <Text style={[styles.signInLink, isDarkMode && {color: '#ffffff'}]}>
          Already have an account?{' '}
          <Text
            onPress={() => {
              navigation.navigate('logIn');
            }}
            style={styles.signIn}>
            Sign in!
          </Text>
        </Text>

        <Button
          icon="google"
          mode="contained-tonal"
          style={[
            styles.googleButton,
            isDarkMode && {backgroundColor: '#fff'},
          ]}>
          Continue with Google
        </Button>

        <Text style={[styles.orText, isDarkMode && {color: '#ffffff'}]}>
          or
        </Text>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={values => {
            console.log(values);
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
                label="First Name"
                mode="outlined"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                error={touched.firstName && errors.firstName ? true : false}
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
                        name="account-outline"
                        size={20}
                        color={isDarkMode ? 'white' : 'black'}
                      />
                    )}
                  />
                }
              />
              {touched.firstName && errors.firstName && (
                <Text style={[styles.errorText, isDarkMode && {color: 'red'}]}>
                  {errors.firstName}
                </Text>
              )}

              <TextInput
                label="Last Name"
                mode="outlined"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                error={touched.lastName && errors.lastName ? true : false}
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
                        name="account-outline"
                        size={20}
                        color={isDarkMode ? 'white' : 'black'}
                      />
                    )}
                  />
                }
              />
              {touched.lastName && errors.lastName && (
                <Text style={[styles.errorText, isDarkMode && {color: 'red'}]}>
                  {errors.lastName}
                </Text>
              )}
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
                }
              />
              {touched.email && errors.email && (
                <Text style={[styles.errorText, isDarkMode && {color: 'red'}]}>
                  {errors.email}
                </Text>
              )}
              {/* Add other form fields here, applying similar dark mode logic */}

              <TextInput
                label="Password"
                mode="outlined"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password ? true : false}
                secureTextEntry={!passwordVisible}
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
                        name="lock-outline"
                        size={20}
                        color={isDarkMode ? 'white' : 'black'}
                      />
                    )}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name={passwordVisible ? 'eye' : 'eye-off'}
                        size={20}
                        color={isDarkMode ? 'white' : 'black'}
                      />
                    )}
                    onPress={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                }
              />
              {touched.password && errors.password && (
                <Text style={[styles.errorText, isDarkMode && {color: 'red'}]}>
                  {errors.password}
                </Text>
              )}
              <TextInput
                label="Confirm Password"
                mode="outlined"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                style={[styles.input, isDarkMode && {backgroundColor: '#333'}]}
                textColor={isDarkMode ? '#ffffff' : '#000000'}
                outlineColor={isDarkMode ? '#ffffff' : '#000000'}
                value={values.confirmPassword}
                theme={{
                  colors: {
                    primary: isDarkMode ? '#e67e22' : '#666666',
                    text: isDarkMode ? '#ffffff' : '#000000',
                    placeholder: isDarkMode ? '#cccccc' : '#666666',
                    background: isDarkMode ? '#333' : '#fff',
                  },
                }}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? true
                    : false
                }
                secureTextEntry={!passwordVisible}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="lock-outline"
                        size={20}
                        color={isDarkMode ? 'white' : 'black'}
                      />
                    )}
                  />
                } // Left Icon
                right={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name={passwordVisible ? 'eye' : 'eye-off'}
                        size={20}
                        color={isDarkMode ? 'white' : 'black'}
                      />
                    )}
                    onPress={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                }
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <TextInput
                label="Phone Number"
                mode="outlined"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                error={touched.phoneNumber && errors.phoneNumber ? true : false}
                keyboardType="phone-pad"
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
                        name="phone-outline"
                        size={20}
                        color={isDarkMode ? 'white' : 'black'}
                      />
                    )}
                  />
                } // Left Icon
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
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
                  Sign Up
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
  googleButton: {
    marginBottom: hp('2%'),
    backgroundColor: '#dde7ee',
    padding: wp('1%'),
    borderRadius: wp('1%'),
  },
  orText: {
    alignSelf: 'center',
    fontSize: wp('4%'),
    color: '#000000',
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

export default SignUpScreen;
