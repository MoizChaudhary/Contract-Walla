import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  useColorScheme,
  Modal,
  Animated,
  Dimensions,
  TextInput,
} from 'react-native';
import CustomHeader from '../../components/customHeader';
//@ts-ignore
import MaterialIconss from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
//@ts-ignore
import {throttle} from 'lodash';

const months = [
  'All',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const caseData = [
  {id: '1', title: 'P L D 2024 Supreme Court 1 Present: Qazi Faez'},
  {id: '2', title: 'P L D 2024 Supreme Court 295 Present: Qazi Faez'},
  {id: '3', title: 'P L D 2024 Balochistan 75 Before Gul Hassan Tareen'},
  {id: '4', title: 'P L D 2024 Supreme Court 88 Present: Qazi Faez'},
];

export default function CustomDropdown() {
  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;
  const [selectedMonth, setSelectedMonth] = useState('');
  const [dropdownVisibleMonth, setDropdownVisibleMonth] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState('PLDs');
  const [keyword, setKeyword] = useState('');
  const [sliderValue, setSliderValue] = useState(1947);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const citationOptions = [
    'PLDs',
    'CLCs',
    'CLDs',
    'MLDs',
    'PCRLJs',
    'PLCs',
    'PTDs',
    'SCMRs',
    'YLRs',
  ];
  const handleValueChange = useCallback(
    throttle((value: any) => {
      setSliderValue(value);
    }, 100), // Adjust throttle delay as needed
    [],
  );
  const handleSearch = () => {
    // Handle search functionality here
    console.log('Keyword:', keyword);
    console.log('Selected Citation:', selectedCitation);
  };
  // Animated value to control the slide effect
  const slideAnim = useRef(
    new Animated.Value(-Dimensions.get('window').width),
  ).current;

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

  const selectMonth = (month: any) => {
    setSelectedMonth(month);
    setDropdownVisibleMonth(false); // Close dropdown after selection
  };
  const YearComponent = ({isDarkMode}: any) => {
    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible); // Toggle visibility on press
    };
  };

  const renderItem = ({item}: any) => (
    <View
      style={[
        styles.caseItem,
        {backgroundColor: isDarkMode ? '#0b0d0e' : '#fff'},
      ]}>
      <Text
        numberOfLines={1}
        style={[styles.caseTitle, {color: isDarkMode ? 'white' : 'black'}]}>
        {item.title}
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: isDarkMode ? '#1e2226' : '#e7e8ec',
          marginVertical: 20,
        }}></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isDarkMode ? '#0b0d0e' : '#fbfcfe'},
            {borderColor: isDarkMode ? '#10355a' : '#10355a'},
          ]}>
          <Text
            style={[
              styles.buttonText,
              {color: isDarkMode ? '#c7dff7' : '#247ad0'},
            ]}>
            AI Summary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isDarkMode ? '#0b0d0e' : '#fbfcfe'},
            {borderColor: isDarkMode ? '#10355a' : '#10355a'},
          ]}>
          <Text
            style={[
              styles.buttonText,
              {color: isDarkMode ? '#c7dff7' : '#247ad0'},
            ]}>
            Read Citation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.Maincontainer,
        themeStyles,
        {backgroundColor: isDarkMode ? '#000000' : 'white'},
      ]}>
      <CustomHeader title={'Case Law Search'} />
      <View
        style={{
          borderWidth: 1,
          borderColor: isDarkMode ? '#1e2226' : '#e7e8ec',
          marginVertical: 5,
        }}></View>
      {/* Dropdown */}
      <ScrollView>
        <View style={{flexDirection: 'row', marginHorizontal: 20,marginVertical:10}}>
          {/* Button to trigger sliding modal */}

          <TouchableOpacity onPress={openModal} style={styles.modalButton}>
            <MaterialIconss
              name={
                dropdownVisibleMonth
                  ? 'arrow-back-ios-new'
                  : 'arrow-back-ios-new'
              }
              size={20}
              alignSelf={'center'}
              color={isDarkMode ? 'white' : 'black'} // Change icon color based on theme
            />
          </TouchableOpacity>
          <Text style={[styles.modalButtonText,{color:isDarkMode?'white':'black'}]}>Case Law Result</Text>
        </View>

        <View style={styles.dropdown}>
          <TouchableOpacity
            onPress={() => setDropdownVisibleMonth(!dropdownVisibleMonth)}
            style={[
              styles.selectedMonthButton,
              {backgroundColor: isDarkMode ? '#0b0d0e' : '#fff'},
            ]}>
            <Text
              style={[
                styles.dropdownLabel,
                {color: isDarkMode ? 'white' : 'black'},
              ]}>
              {selectedMonth || 'Choose a Month'}{' '}
            </Text>
            <MaterialIconss
              name={
                dropdownVisibleMonth
                  ? 'keyboard-arrow-up'
                  : 'keyboard-arrow-down'
              }
              size={25}
              alignSelf={'center'}
              color={isDarkMode ? 'white' : 'black'} // Change icon color based on theme
            />
          </TouchableOpacity>

          {/* Show months if dropdown is visible */}
          {dropdownVisibleMonth && (
            <View style={styles.monthGrid}>
              {months.map(month => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.monthButton,
                    {backgroundColor: isDarkMode ? '#0b0d0e' : '#fff'},
                  ]}
                  onPress={() => selectMonth(month)}>
                  <Text
                    style={[
                      styles.monthText,
                      {color: isDarkMode ? 'white' : '#333'},
                    ]}>
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <FlatList
          data={caseData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.caseList}
        />
      </ScrollView>

      {/* Sliding Modal */}
      <Modal transparent visible={modalVisible} animationType="none">
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modalContainer,
              {backgroundColor: isDarkMode ? 'black' : 'white'},
              {transform: [{translateX: slideAnim}]},
            ]}>
            {/* <Text style={styles.modalText}>This is a sliding modal!</Text> */}
            <TouchableOpacity
              onPress={closeModal}
              style={styles.modalCloseButton}>
              <Text style={[styles.modalButtonText,{color:isDarkMode?'#fff':'#fff'}]}>Close Caselaw result</Text>
            </TouchableOpacity>
            <ScrollView
              style={[
                styles.container,
                {backgroundColor: isDarkMode ? 'black' : 'white'},
              ]}>
              <Text style={styles.heading}>Search For a Caselaw</Text>

              <View style={styles.section}>
                <Text style={styles.label}>Keyword</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Search for a keyword"
                  value={keyword}
                  onChangeText={setKeyword}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Citation</Text>
                <View style={styles.citationContainer}>
                  {citationOptions.map(citation => (
                    <TouchableOpacity
                      key={citation}
                      style={[
                        styles.citationButton,
                        selectedCitation === citation && styles.selectedButton,
                      ]}
                      onPress={() => setSelectedCitation(citation)}>
                      <Text
                        style={[
                          styles.citationText,
                          selectedCitation === citation && styles.selectedText,
                          {color: isDarkMode ? 'white' : 'black'},
                        ]}>
                        {citation}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Court Filter Dropdown */}
              <View style={styles.section}>
                <Text
                  style={[
                    styles.label,
                    {color: isDarkMode ? 'white' : 'black'},
                  ]}>
                  Court
                </Text>
                {/* Add dropdown for courts here */}
              </View>

              {/* Year Filter Dropdown */}
              <View style={styles.section}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.label,
                      {color: isDarkMode ? '#fff' : '#000'},
                    ]}>
                    For The Year
                  </Text>
                  <TouchableOpacity
                    onPress={() => setDropdownVisible(!dropdownVisible)}>
                    <MaterialIconss
                      name={
                        dropdownVisible
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      size={25}
                      alignSelf={'center'}
                      color={isDarkMode ? 'white' : 'black'} // Change icon color based on theme
                    />
                  </TouchableOpacity>
                </View>
                {dropdownVisible && (
                  <View style={styles.dropdownContent}>
                    <Text
                      style={[
                        styles.sliderValueText,
                        {color: isDarkMode ? 'white' : 'black'},
                      ]}>
                      Year: {sliderValue}
                    </Text>
                    <Slider
                      style={styles.slider}
                      minimumValue={1947}
                      maximumValue={2024}
                      thumbTintColor={isDarkMode ? '#185ea5' : '#185ea5'}
                      minimumTrackTintColor={isDarkMode ? '#185ea5' : '#185ea5'}
                      maximumTrackTintColor={isDarkMode ? '#aeb1b6' : '#aeb1b6'}
                      step={1}
                      onValueChange={handleValueChange} // Use throttled function
                    />
                  </View>
                )}

                {/* Add dropdown for year here */}
              </View>

              {/* Search Button */}
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search Citation</Text>
                <MaterialIconss
                  name={'search'}
                  size={20}
                  alignSelf={'center'}
                  color={isDarkMode ? 'white' : 'white'} // Change icon color based on theme
                />
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  modalButton: {
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'center',
  },
  modalButtonText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    height: '95%',
    marginTop: 100,
    padding: 20,
    // borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#FF6F00',
    padding: 10,
    borderRadius: 5,
  },
  dropdown: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  selectedMonthButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: '#f5f5f5',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monthButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 5,
    backgroundColor: '#f5f5f5',
    minWidth: 80,
    alignItems: 'center',
  },
  monthText: {
    fontSize: 14,
  },
  caseList: {
    marginTop: 10,
  },
  caseItem: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.45,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  darkTheme: {
    backgroundColor: '#1b1b1b',
  },
  lightTheme: {
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  citationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  citationButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '30%',
    alignItems: 'center',
    marginVertical: 5,
  },
  selectedButton: {
    backgroundColor: '#FF6F00',
    borderColor: '#FF6F00',
  },
  citationText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 12, 
    borderRadius: 8,
     flexDirection: 'row',
     marginBottom:50,
     alignItems:'center',
     paddingHorizontal:20
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  slider: {
    width: 220,
    height: 40,
    marginHorizontal: 10,
  },
  minMaxText: {
    fontSize: 16,
  },
  sliderValueText: {
    fontSize: 18,
    marginBottom: 10,
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#000000',
  },
  dropdownContent: {
    marginTop: 10,
    padding: 10,
  },
});
