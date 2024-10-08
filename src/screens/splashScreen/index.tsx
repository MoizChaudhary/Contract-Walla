import {View, Image, StatusBar, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Images} from '../../assets/images/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; // Import responsive functions

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    // Set timeout to navigate after 5 seconds
    setTimeout(() => {
      navigation.replace('logIn'); // Navigate to the Login screen or another screen
    }, 5000);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#050019',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor="#050019" barStyle="light-content" />
      <View>
        <Image
          source={Images.Logo}
          style={{
            width: wp('50%'), // Width is 50% of the screen width
            height: hp('25%'), // Height is 25% of the screen height
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: wp('6.5%'), // Font size is 6.5% of screen width
            color: '#ff830e',
            fontWeight: 'bold',
            marginHorizontal: wp('4%'),
            justifyContent: 'center',
            // marginTop: hp('2%'), // Margin top is 2% of screen height
          }}>
          Contract Walla
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
