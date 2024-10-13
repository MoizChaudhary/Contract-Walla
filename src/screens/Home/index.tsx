import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/customHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import FontAwesome from 'react-native-vector-icons/Feather';
//@ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
import MaterialIconss from 'react-native-vector-icons/MaterialIcons';

import {Images} from '../../assets/images';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');
  const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;
  const navigation: any = useNavigation();

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };
  return (
    <View style={[styles.Main, themeStyles]}>
      <StatusBar
        backgroundColor={isDarkMode ? '#000' : 'white'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <CustomHeader title={'Home'} />
      <View style={{borderWidth:1,borderColor:isDarkMode ? '#dfdfdf' : '#dfdfdf'}}></View>

      <ScrollView>
      <View style={styles.container}>
        <View style={{padding: wp('4%'), paddingHorizontal: wp('5%')}}>
          <Text
            style={{
              color: '#e34d00',
              fontSize: wp('4%'),
              fontWeight: '700',
              padding: wp('2%'),
            }}>
            Justice Made Easy
          </Text>
          <Text
            style={{
              color: isDarkMode ? '#fff' : '#000',
              fontSize: wp('6%'),
              fontWeight: '700',
              paddingHorizontal: wp('2%'),
            }}>
            Powered by AI, Driven by
          </Text>
          <Text
            style={{
              color: '#e34d00',
              fontSize: wp('7%'),
              fontWeight: '700',
              paddingHorizontal: wp('2%'),
            }}>
            Lawyers
          </Text>
          <Text
            style={{
              color: isDarkMode ? '#fff' : '#000',
              paddingHorizontal: wp('2%'),
              paddingVertical: wp('2%'),
            }}>
            We help legal professionals, and organizations streamline their
            legal procedures, saving valuable time and money along the way.
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#e34d00',
              padding: wp('3%'),
              alignSelf: 'center',
              borderRadius: wp('2%'),
              flexDirection: 'row',
              marginVertical: wp('4%'),
              marginHorizontal: wp('8%'),
            }}>
            <Text
              style={{
                fontSize: wp('3%'),
                alignSelf: 'center',
                fontWeight: '700',
                color: isDarkMode ? '#000' : 'white',
                width: '100%',
                textAlign: 'center',
              }}>
              Draft a Contract in under 1 minute.
            </Text>
            <FontAwesome
              name="arrow-right"
              size={18}
              alignSelf={'center'}
              color={isDarkMode ? 'black' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#e34d00',
              padding: wp('3%'),
              alignSelf: 'center',
              borderRadius: wp('2%'),
              flexDirection: 'row',
              marginHorizontal: wp('8%'),
            }}>
            <Text
              style={{
                fontSize: wp('3%'),
                alignSelf: 'center',
                fontWeight: '700',
                color: isDarkMode ? '#000' : 'white',
                width: '100%',
                textAlign: 'center',
              }}>
              Search for a Caselaw Citation
            </Text>
            <FontAwesome
              name="arrow-right"
              size={18}
              alignSelf={'center'}
              color={isDarkMode ? 'black' : 'white'}
            />
          </TouchableOpacity>
        </View>
        

        <View style={{flexDirection: 'row', justifyContent: 'center',marginVertical:hp('2%')}}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp('2%'),
              marginTop: hp('1%'),
            }}>
            <MaterialIconss
              name="gavel"
              size={40}
              alignSelf={'center'}
              color={isDarkMode ? '#f3c896' : '#f3c896'}
            />
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginHorizontal: wp('2%'),
                marginTop: hp('1%'),
              }}>
              <Text style={{textAlign: 'center',color: isDarkMode ? '#fff' : '#000',}}>Innovative AI </Text>
              <Text style={{textAlign: 'center',color: isDarkMode ? '#fff' : '#000',}}>Contract Marker</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp('2%'),
              marginTop: hp('1%'),
            }}>
            <MaterialIcons
              name="clipboard-text-outline"
              size={40}
              alignSelf={'center'}
              color={isDarkMode ? '#f3c896' : '#f3c896'}
            />
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginHorizontal: wp('2%'),
                marginTop: hp('1%'),
              }}>
              <Text style={{textAlign: 'center',color: isDarkMode ? '#fff' : '#000',}}>Technology-Driven</Text>
              <Text style={{textAlign: 'center',color: isDarkMode ? '#fff' : '#000',}}>Legal Excillence</Text>
            </TouchableOpacity>
          </View>
        </View>
        

        <View
          style={{
            borderRadius: 10,
            borderBottomLeftRadius: 10,
            overflow: 'hidden',
            marginVertical: hp('4%'),
          }}>
          <Image
            source={Images.homeImage}
            style={{
              width: wp('100%'),
              height: hp('50%'),
              resizeMode: 'cover',
            }}
          />
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Main: {flex: 1},
  container: {paddingHorizontal: wp('4%')},
  darkTheme: {
    backgroundColor: '#000000',
  },
  lightTheme: {
    backgroundColor: '#ffffff',
  },
});
