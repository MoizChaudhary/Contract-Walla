import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
// Import images and vector icons as before
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomHeader = ({title}: any) => {
  const navigation = useNavigation(); // Use navigation inside the header
  // const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.headerContainer]}>
      <TouchableOpacity
        //@ts-ignore
        onPress={() => navigation.toggleDrawer()}>
        <MaterialIcons
          name="menu"
          size={25}
          color={isDarkMode ? '#fff' : '#000'}
         />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, {color: isDarkMode ? '#fff' : '#000'}]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: 60,
    elevation: 3, // Shadow for Android
  },
  headerTitle: {
    fontSize: 20,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  darkTheme: {
    backgroundColor: '#000', // Dark mode background
  },
  lightTheme: {
    backgroundColor: '#fff', // Light mode background
  },
});

export default CustomHeader;
