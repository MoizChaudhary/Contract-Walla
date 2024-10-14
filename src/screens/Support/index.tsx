import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  StatusBar,
} from 'react-native';

const SupportPopup = ({visible, onClose}: any) => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');
  const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };

  return (
    <View style={themeStyles}>
      <StatusBar
        backgroundColor={isDarkMode ? '#000' : '#fff'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={onClose} // Call onClose when the modal is requested to be closed
      >
        <View style={[styles.modalContainer,{backgroundColor:isDarkMode ? 'rgba(0, 0, 0, 0.7)'  :'rgba(255, 255, 255, 0.7)' }]}>
          <View
            style={[
              styles.popup,
              isDarkMode ? styles.darkPopup : styles.lightPopup,
            ]}>
            <Text
              style={[
                styles.title,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              Need Help?
            </Text>
            <Text
              style={[
                styles.description,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              If you have any concerns or need assistance, please don't hesitate
              to email us at
              <Text style={styles.email}> info@contractwalla.com</Text>. We're
              here to help you with any queries or issues.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.contactButton,
                  isDarkMode
                    ? styles.darkContactButton
                    : styles.lightContactButton,
                ]}>
                <Text style={[styles.buttonText,{color:isDarkMode ? '#c7dff7' : '#3c6895'}]}>Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  isDarkMode ? styles.darkCloseButton : styles.lightCloseButton,
                ]}
                onPress={onClose}>
                <Text  style={[styles.buttonText,{color:isDarkMode ? '#f9debf' : '#5a3e1c'}]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Background overlay
  },
  popup: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Shadow on Android
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  email: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    padding: 10,
    borderRadius: 5,
    paddingHorizontal:20,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    paddingHorizontal:30,

  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  darkTheme: {
    backgroundColor: '#000000',
  },
  lightTheme: {
    backgroundColor: '#ffffff',
  },
  darkPopup: {
    backgroundColor: '#1c1c1c', // Dark background for the popup
  },
  lightPopup: {
    backgroundColor: '#ffffff', // Light background for the popup
  },
  darkText: {
    color: '#ffffff', // Light text color for dark mode
  },
  lightText: {
    color: '#000000', // Dark text color for light mode
  },
  darkContactButton: {
    backgroundColor: '#0a2744', // Dark button background
  },
  lightContactButton: {
    backgroundColor: '#E0F2FF', // Light button background
  },
  darkCloseButton: {
    backgroundColor: '#2e1b05', // Dark button background
  },
  lightCloseButton: {
    backgroundColor: '#FFF3E0', // Light button background
  },
});

export default SupportPopup;
