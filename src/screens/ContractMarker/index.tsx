import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import uuid from 'react-native-uuid';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore
import MaterialIconss from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import Entypo from 'react-native-vector-icons/Entypo';

import CustomHeader from '../../components/customHeader';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const colorScheme = useColorScheme(); // Detect system theme
  const [modalVisible, setModalVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [chats, setChats] = useState([]); // State to store chat items

  const addNewChat = () => {
    //@ts-ignore
    setChats([...chats, { id: chats.length + 1, name: 'New Chat' }]);
  };

  useEffect(() => {
    setMessages([
      //@ts-ignore
      {
        user: {
          _id: 2,
          name: 'MyMunshi',
          avatar: require('../../assets/images/robot.png'), // Update with a URL or local image path
        },
        _id: uuid.v4(),
        text: 'I am Your Munshi, a specialized AI-Lawyer designed to draft, amend, and create templates for legal contracts. How can I assist you with your contract needs today? Please provide me with your specific requirements and I will do my best to help you create a legally sound contract.',
        createdAt: new Date(),
      },
    ]);
  }, []);

  const handleSearch = () => {
    // Handle search functionality here
    console.log('Keyword:', keyword);
  };

  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to the center
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: -Dimensions.get('window').width, // Slide back off-screen
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false)); // Close modal after animation
  };

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  const renderSend = (props:any) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: colorScheme === 'dark' ? '#f57c00' : '#f57c00' },
          ]}
          onPress={() => {
            if (props.text && props.onSend) {
              props.onSend({ text: props.text.trim() }, true);
            }
          }}>
          <Text style={[styles.sendText, { color: '#fff' }]}>Send</Text>
          <MaterialIcons
            name={'send-outline'}
            size={25}
            alignSelf={'center'}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBubble = (props:any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#f57c00', // Sent message color
          },
          left: {
            backgroundColor: colorScheme === 'dark' ? '#333333' : '#e6f4ff', // Received message color
          },
        }}
        textStyle={{
          right: {
            color: '#ffffff', // Sent message text color
          },
          left: {
            color: colorScheme === 'dark' ? '#ffffff' : '#000000', // Received message text color
          },
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <CustomHeader title={'ContractMarker'} />
      <View style={{ borderWidth: 1, borderColor: colorScheme === 'dark' ? '#1e2226' : '#e7e8ec', marginVertical: 5 }}></View>
      <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
        <TouchableOpacity onPress={openModal} style={styles.modalButton}>
          <MaterialIconss
            name={'arrow-back-ios-new'}
            size={20}
            alignSelf={'center'}
            color={colorScheme === 'dark' ? 'white' : 'black'} // Change icon color based on theme
          />
        </TouchableOpacity>
        <Text style={[styles.modalButtonText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
          New Chat
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        //@ts-ignore
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'User',
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        textInputProps={{
          placeholderTextColor: colorScheme === 'dark' ? '#fff' : 'black',
        }}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: colorScheme === 'dark' ? '#000' : '#fff', // Set this to your preferred background color
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colorScheme === 'dark' ? '#0b6bcb' : '#dae1e8',
              justifyContent: 'center',
              padding: 5,
              marginTop: 20,
            }}
          />
        )}
      />

      <Modal transparent visible={modalVisible} animationType="none">
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modalContainer,
              { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' },
              { transform: [{ translateX: slideAnim }] },
            ]}>
            <ScrollView
              contentContainerStyle={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.heading, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Chat History</Text>
                <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
                  <Entypo
                    name={'cross'}
                    size={20}
                    alignSelf={'center'}
                    color={colorScheme === 'dark' ? 'white' : 'black'} // Change icon color based on theme
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.section}>
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#555'}
                  value={keyword}
                  onChangeText={setKeyword}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                <Text style={[styles.heading, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>New Contact</Text>
                <TouchableOpacity onPress={addNewChat} style={styles.modalCloseButton}>
                  <Entypo
                    name={'plus'}
                    size={20}
                    color={colorScheme === 'dark' ? 'white' : 'black'} // Change icon color based on theme
                  />
                </TouchableOpacity>
              </View>

              <FlatList
                data={chats}
                //@ts-ignore
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  
                  <View style={styles.chatItem}>
                    <Text style={{ color: colorScheme === 'dark' ? '#fff' : '#000' }}
                    //@ts-ignore
                    >{item.name }</Text>
                  </View>
                )}
              />

              {/* Search Button */}
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search Citation</Text>
                <MaterialIconss
                  name={'search'}
                  size={20}
                  alignSelf={'center'}
                  color="#fff" // Icon color for search
                />
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sendButton: {
    flexDirection: 'row',
    padding: hp(1), // 1% of screen height
    margin: wp(2), // 2% of screen width
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  sendText: {
    marginHorizontal: wp(2), // 2% of screen width
    fontSize: hp(2), // 2% of screen height
  },
  modalButton: {
    borderRadius: 5,
    marginVertical: hp(2), // 2% of screen height
    alignSelf: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: wp(80), // 80% of screen width
    height: hp(95), // 95% of screen height
    marginTop: hp(10), // 10% of screen height
    padding: wp(5), // 5% of screen width
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: hp(2), // 2% of screen height
    fontWeight: 'bold',
    marginBottom: hp(2), // 2% of screen height
    textAlign: 'center',
  },
  section: {
    marginBottom: hp(2), // 2% of screen height
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: hp(1), // 1% of screen height
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: hp(1.5), // 1.5% of screen height
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: hp(5), // 5% of screen height
    alignItems: 'center',
    paddingHorizontal: wp(5), // 5% of screen width
  },
  searchButtonText: {
    color: '#fff',
    fontSize: hp(2), // 2% of screen height
    fontWeight: 'bold',
    alignSelf: 'center',
    marginHorizontal: wp(2), // 2% of screen width
  },
  modalButtonText: {
    color: '#000',
    fontSize: hp(2), // 2% of screen height
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: wp(2), // 2% of screen width
  },
  modalCloseButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: hp(2), // 2% of screen height
  },
  chatItem: {
    padding: hp(2), // 2% of screen height
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ChatScreen;
