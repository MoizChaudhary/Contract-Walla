import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoute} from '../navigations/navigationRoute';
import React from 'react';
import {ThemeProvider} from '../ContextApi/ThemeContext';
// import bottomNavigation from '../../bottomNavigation/bottomNavigation';
import SplashScreen from '../screens/splashScreen';
import signUp from '../screens/signUp';
import logIn from '../screens/logIn';
import forgotPassword from '../screens/forgotPassword';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'SplashScreen'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name={NavigationRoute.SplashScreen}
            component={SplashScreen}
          />

          <Stack.Screen name={NavigationRoute.signUp} component={signUp} />
          <Stack.Screen name={NavigationRoute.logIn} component={logIn} />
          <Stack.Screen
            name={NavigationRoute.forgotPassword}
            component={forgotPassword}
          />
          {/* <Stack.Screen name={NavigationRoute.Otp} component={Otp} /> */}
          {/* <Stack.Screen
            name={NavigationRoute.NewPassword}
            component={NewPassword}
          /> */}

          {/* <Stack.Screen
            name={NavigationRoute.bottomNavigation}
            component={bottomNavigation}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Navigator;
