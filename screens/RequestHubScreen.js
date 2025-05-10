import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Checkbox,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

const destinations = ['Accra', 'Akuse', 'Akosombo', 'Other'];
const approvers = ['John Doe', 'Jane Smith'];

const RequestHubScreen = () => {
  const [requestType, setRequestType] = useState('regular');
  const [mealTypes, setMealTypes] = useState({ breakfast: false, lunch: false, dinner: false });
  const [travelDate, setTravelDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isTravelDatePickerVisible, setTravelDatePickerVisible] = useState(false);
  const [isReturnDatePickerVisible, setReturnDatePickerVisible] = useState(false);
  const [destination, setDestination] = useState('Accra');
  const [otherDestination, setOtherDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [telephone, setTelephone] = useState('');
  const [approver, setApprover] = useState(approvers[0]);
  const [isBookingGoing, setIsBookingGoing] = useState(false);
  const [isDriverGoing, setIsDriverGoing] = useState(false);
  const [nonStaffList, setNonStaffList] = useState([{ name: '' }]);

  const toggleMealType = (type) => {
    setMealTypes({ ...mealTypes, [type]: !mealTypes[type] });
  };

  const handleAddNonStaff = () => {
    setNonStaffList([...nonStaffList, { name: '' }]);
  };

  const updateNonStaffName = (index, value) => {
    const updatedList = [...nonStaffList];
    updatedList[index].name = value;
    setNonStaffList(updatedList);
  };

  const handleTravelDateChange = (_, selectedDate) => {
    setTravelDatePickerVisible(false);
    if (selectedDate) setTravelDate(selectedDate);
  };

  const handleReturnDateChange = (_, selectedDate) => {
    setReturnDatePickerVisible(false);
    if (selectedDate) setReturnDate(selectedDate);
  };

  const handleSubmit = () => {
    // Submission logic
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>🛏️ RequestHub: Book Accommodation</Text>

            <Text style={styles.label}>Request Type</Text>
            <View style={styles.rowWrap}>
              <Button
                mode={requestType === 'regular' ? 'contained' : 'outlined'}
                onPress={() => setRequestType('regular')}
                style={styles.toggleButton}
              >
                Regular
              </Button>
              <Button
                mode={requestType === 'emergency' ? 'contained' : 'outlined'}
                onPress={() => setRequestType('emergency')}
                style={styles.toggleButton}
              >
                Emergency
              </Button>
            </View>

            <Text style={styles.label}>Meal Type</Text>
            {['breakfast', 'lunch', 'dinner'].map((meal) => (
              <Checkbox.Item
                key={meal}
                label={meal.charAt(0).toUpperCase() + meal.slice(1)}
                status={mealTypes[meal] ? 'checked' : 'unchecked'}
                onPress={() => toggleMealType(meal)}
                mode="android"
              />
            ))}

            <Text style={styles.label}>Travel Date</Text>
            <TextInput
              label="Travel Date"
              value={travelDate.toDateString()}
              editable={false}
              onPressIn={() => setTravelDatePickerVisible(true)}
              mode="outlined"
              style={styles.input}
            />
            {isTravelDatePickerVisible && (
              <DateTimePicker value={travelDate} onChange={handleTravelDateChange} mode="date" />
            )}

            <Text style={styles.label}>Return Date</Text>
            <TextInput
              label="Return Date"
              value={returnDate.toDateString()}
              editable={false}
              onPressIn={() => setReturnDatePickerVisible(true)}
              mode="outlined"
              style={styles.input}
            />
            {isReturnDatePickerVisible && (
              <DateTimePicker value={returnDate} onChange={handleReturnDateChange} mode="date" />
            )}

            <Text style={styles.label}>Traveling To</Text>
            <Picker selectedValue={destination} onValueChange={setDestination} style={styles.picker}>
              {destinations.map((dest) => (
                <Picker.Item label={dest} value={dest} key={dest} />
              ))}
            </Picker>
            {destination === 'Other' && (
              <TextInput
                label="Enter destination"
                value={otherDestination}
                onChangeText={setOtherDestination}
                mode="outlined"
                style={styles.input}
              />
            )}

            <TextInput
              label="Duration in days"
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Telephone"
              value={telephone}
              onChangeText={setTelephone}
              keyboardType="phone-pad"
              mode="outlined"
              style={styles.input}
            />

            <Text style={styles.label}>Approver</Text>
            <Picker selectedValue={approver} onValueChange={setApprover} style={styles.picker}>
              {approvers.map((appr) => (
                <Picker.Item label={appr} value={appr} key={appr} />
              ))}
            </Picker>

            <Checkbox.Item
              label="Booking person is going"
              status={isBookingGoing ? 'checked' : 'unchecked'}
              onPress={() => setIsBookingGoing(!isBookingGoing)}
              mode="android"
            />

            <Checkbox.Item
              label="Driver is going"
              status={isDriverGoing ? 'checked' : 'unchecked'}
              onPress={() => setIsDriverGoing(!isDriverGoing)}
              mode="android"
            />

            <Text style={styles.label}>Add Staff to Trip</Text>
            <TextInput label="Search and add staff" mode="outlined" style={styles.input} />

            <Text style={styles.label}>Add Non-Staff to Trip</Text>
            {nonStaffList.map((person, idx) => (
              <TextInput
                key={idx}
                label={`Non-staff name ${idx + 1}`}
                value={person.name}
                onChangeText={(text) => updateNonStaffName(idx, text)}
                mode="outlined"
                style={styles.input}
              />
            ))}

            <Button
              mode="outlined"
              icon="account-plus"
              onPress={handleAddNonStaff}
              style={styles.button}
            >
              Add Non-Staff
            </Button>

            <Button
              mode="contained"
              icon="check"
              onPress={handleSubmit}
              style={styles.button}
            >
              Submit Request
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  label: {
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    marginBottom: 12,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 12,
  },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  toggleButton: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    marginVertical: 12,
  },
});

export default RequestHubScreen;
