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
import Home from '../screens/Home';
import CaseLawSearch from '../screens/CaseLawSearch';
import YourMunshi from '../screens/YourMunshi';
import ContractMarker from '../screens/ContractMarker';
import MenuNavigations from './MenuNavigations';
import Support from '../screens/Support';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();
 

const Navigator = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'MenuNavigations'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name={NavigationRoute.SplashScreen}
            component={SplashScreen}
          />

          <Stack.Screen name={NavigationRoute.signUp} component={signUp} />
          <Stack.Screen name={NavigationRoute.CaseLawSearch} component={CaseLawSearch} />
          <Stack.Screen name={NavigationRoute.YourMunshi} component={YourMunshi} />
          <Stack.Screen name={NavigationRoute.ContractMarker} component={ContractMarker} />
          <Stack.Screen name={NavigationRoute.Support} component={Support} />
          <Stack.Screen name={NavigationRoute.Profile} component={Profile} />

           

          <Stack.Screen
            name={NavigationRoute.forgotPassword}
            component={forgotPassword}
          />
          <Stack.Screen
            name={NavigationRoute.MenuNavigations}
            component={MenuNavigations}
          />
          
        
        </Stack.Navigator>
      </NavigationContainer>
       
    </ThemeProvider>
  );
};

export default Navigator;
