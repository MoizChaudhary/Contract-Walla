import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import YourMunshi from '../screens/YourMunshi';
import ContractMarker from '../screens/ContractMarker';
import CaseLawSearch from '../screens/CaseLawSearch';
import Support from '../screens/Support';
import { Images } from '../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//@ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
//@ts-ignore
import MaterialIconss from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NavigationRoute } from './navigationRoute';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ toggleDarkMode, isDarkMode }: any) => {
  const navigation = useNavigation();
  const [selectedMenu, setSelectedMenu] = useState(NavigationRoute.Home); // Default selected item

  return (
    <View
      style={[
        styles.drawerContent,
        { backgroundColor: isDarkMode ? '#000' : '#fff' },
      ]}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={Images.Logo}
            style={{ width: wp('12%'), height: hp('8%'), resizeMode: 'contain' }}
          />
          <Text
            style={{
              alignSelf: 'center',
              marginHorizontal: 10,
              color: isDarkMode ? '#ffffff' : '#000000',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            MyMunshi
          </Text>
        </View>

        {/* Menu Items */}
        <DrawerItem
          label="Home"
          iconName="home"
          navigationTarget={NavigationRoute.Home}
          isDarkMode={isDarkMode}
          selected={selectedMenu === NavigationRoute.Home}
          setSelectedMenu={setSelectedMenu}
        />
        <DrawerItem
          label="Your Munshi"
          iconName="robot"
          navigationTarget={NavigationRoute.YourMunshi}
          isDarkMode={isDarkMode}
          selected={selectedMenu === NavigationRoute.YourMunshi}
          setSelectedMenu={setSelectedMenu}
        />
        <DrawerItem
          label="Contract Marker"
          iconName="clipboard-text"
          navigationTarget={NavigationRoute.ContractMarker}
          isDarkMode={isDarkMode}
          selected={selectedMenu === NavigationRoute.ContractMarker}
          setSelectedMenu={setSelectedMenu}
        />
        <DrawerItem
          label="Case Law Search"
          iconName="gavel"
          navigationTarget={NavigationRoute.CaseLawSearch}
          isDarkMode={isDarkMode}
          selected={selectedMenu === NavigationRoute.CaseLawSearch}
          setSelectedMenu={setSelectedMenu}
        />
        <View>
          <Image
            source={Images.robot}
            style={{ width: wp("100%"), height: hp("30"), resizeMode: 'contain', right: wp("20%") }}
          />
        </View>
        <DrawerItem
          label="Support"
          materialFontName="support"
          navigationTarget={NavigationRoute.Support}
          isDarkMode={isDarkMode}
          selected={selectedMenu === NavigationRoute.Support}
          setSelectedMenu={setSelectedMenu}
        />

        {/* Dark Mode Switch */}
        <View style={styles.switchContainer}>
          <Text style={[styles.menuItem, { color: isDarkMode ? '#fff' : '#000' }]}>
            Dark Mode
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>

        <DrawerItem
          label="Profile"
          fontIconName="circle-user"
          navigationTarget={NavigationRoute.Support}
          isDarkMode={isDarkMode}
          selected={selectedMenu === 'Profile'} // Update condition if needed
          setSelectedMenu={setSelectedMenu}
        />
      </ScrollView>
    </View>
  );
};

const DrawerItem = ({ label, iconName, navigationTarget, isDarkMode, selected, setSelectedMenu,materialFontName,fontIconName}: any) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.menuItemTouchStyle,
        { backgroundColor: selected ? (isDarkMode ? '#333': '#dde7ee') : (isDarkMode ? '#000' : '#fff') },
      ]}
      onPress={() => {
        //@ts-ignore
        navigation.navigate(navigationTarget);
        setSelectedMenu(navigationTarget); // Set selected menu
      }}>
      <MaterialIcons
        name={iconName}
        size={25}
        alignSelf={"center"}
        color={isDarkMode ? 'white' : 'black'}
      />
      <MaterialIconss
        name={materialFontName}
        size={25}
        alignSelf={"center"}
        color={isDarkMode ? 'white' : 'black'}
      />
       <FontAwesome
        name={fontIconName}
        size={25}
        alignSelf={"center"}
        color={isDarkMode ? 'white' : 'black'}
      />
      <Text style={[styles.menuItem, { color: isDarkMode ? '#fff' : '#000' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function DrawerNavigator() {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };
const toggleDrawer=()=>{
  toggleDrawer();
}
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent
          {...props}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          toggleDrawer={toggleDrawer}
        />
      )}
      screenOptions={{
        headerShown: false, // This hides the default header
      }}>
      <Drawer.Screen name={NavigationRoute.Home} component={Home} />
      <Drawer.Screen name={NavigationRoute.YourMunshi} component={YourMunshi} />
      <Drawer.Screen name={NavigationRoute.ContractMarker} component={ContractMarker} />
      <Drawer.Screen name={NavigationRoute.CaseLawSearch} component={CaseLawSearch} />
      <Drawer.Screen name={NavigationRoute.Support} component={Support} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    marginHorizontal: wp('3%'),
    paddingVertical: wp('3%'),
  },
  profileItem: {
    fontSize: 18,
    paddingVertical: 10,
    marginTop: 'auto',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  menuItemTouchStyle: {
    paddingHorizontal: wp('5%'),
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp('2%'),
    borderRadius: wp('2%'),
  },
});
