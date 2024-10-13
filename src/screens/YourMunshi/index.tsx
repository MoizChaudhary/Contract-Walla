import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/customHeader'
import { useNavigation } from '@react-navigation/native';
 const YourMunshi = () => {
   return (
    <View>
      <CustomHeader title={"YourMunshi"}/>
      <Text>YourMunshi</Text>
    </View>
  )
}

export default YourMunshi

const styles = StyleSheet.create({})