import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoute} from '../navigations/navigationRoute';
import React, {useState} from 'react';
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
// import MenuNavigations from '../navigations/MenuNavigations';
import Support from '../screens/Support';
import Profile from '../screens/Profile';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useColorScheme} from 'react-native';
import {CustomDrawerContent} from '../navigations/MenuNavigations';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreens = () => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent
          {...props}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      )}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name={NavigationRoute.Home} component={Home} />
      <Drawer.Screen name={NavigationRoute.YourMunshi} component={YourMunshi} />
      <Drawer.Screen
        name={NavigationRoute.ContractMarker}
        component={ContractMarker}
      />
      <Drawer.Screen
        name={NavigationRoute.CaseLawSearch}
        component={CaseLawSearch}
      />
      <Drawer.Screen name={NavigationRoute.Support} component={Support} />
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'DrawerScreens'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name={NavigationRoute.SplashScreen}
            component={SplashScreen}
          />
          <Stack.Screen name={NavigationRoute.logIn} component={logIn} />
          <Stack.Screen name={NavigationRoute.signUp} component={signUp} />
          <Stack.Screen
            name={NavigationRoute.forgotPassword}
            component={forgotPassword}
          />
          <Stack.Screen name="DrawerScreens" component={DrawerScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Navigator;
