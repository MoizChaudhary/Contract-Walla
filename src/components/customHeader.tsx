import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomHeader = ({ title }:any) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const toggleDrawer = () => {
    const parentNavigation = navigation.getParent();  // Get the parent (drawer) navigation
    if (parentNavigation) {
      parentNavigation.dispatch(DrawerActions.toggleDrawer());
    } else {
      console.log('No drawer navigation available.');
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={toggleDrawer}>
        <MaterialIcons name="menu" size={25} color={isDarkMode ? '#fff' : '#000'} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: 60,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
