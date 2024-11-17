import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default function TenantList({ route }) {
  const navigation = useNavigation();
  const [tenantName, setTenantName] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantAddress, setTenantAddress] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [leaseStart, setLeaseStart] = useState(new Date());
  const [leaseEnd, setLeaseEnd] = useState('');
  const [tenants, setTenants] = useState(route?.params?.tenants || []);

  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  // Show the start date picker
  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  // Hide the start date picker
  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  // Handle date selection for start date
  const handleStartDate = (date) => {
    setLeaseStart(date); // Keep date as object
    hideStartDatePicker();
  };

  // Show the end date picker
  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  // Hide the end date picker
  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  // Handle date selection for end date
  const handleEndDate = (date) => {
    setLeaseEnd(date); // Keep date as object
    hideEndDatePicker();
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  // Address validation function
  const isValidAddress = (address) => {
    const addressPattern = /^[0-9]{1,5}\s[a-zA-Z0-9\s.,'-]{3,}(\s[A-Za-z]{1,10})?$/;
    return addressPattern.test(address);
  };

  // Phone number validation function (only numbers)
  const isValidPhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/; // Only 10 digits allowed
    return phonePattern.test(phone);
  };

  const handleAddTenant = () => {
    // Simple validation to ensure required fields are filled
    if (!tenantName || !tenantEmail || !tenantAddress || !tenantPhone || !leaseStart || !leaseEnd) {
      Alert.alert('All fields must be filled!');
      return;
    }

    // Check if email is valid
    if (!isValidEmail(tenantEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Check if address is valid
    if (!isValidAddress(tenantAddress)) {
      Alert.alert('Invalid Address', 'Please enter a valid address (including street number and name).');
      return;
    }

    // Check if phone number is valid
    if (!isValidPhone(tenantPhone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number (only numbers, 10 digits).');
      return;
    }

    // Add tenant to the list
    const newTenant = {
      name: tenantName,
      email: tenantEmail,
      address: tenantAddress,
      phone: tenantPhone,
      leaseStart: leaseStart,
      leaseEnd: leaseEnd,
    };

    const updatedTenants = [...tenants, newTenant];
    setTenants(updatedTenants);

    // Clear the form after adding
    setTenantName('');
    setTenantEmail('');
    setTenantAddress('');
    setTenantPhone('');
    setLeaseStart(new Date());
    setLeaseEnd('');

    // Navigate to Owner Dashboard with updated tenants list
    navigation.navigate('OwnerDashboard', { tenants: updatedTenants });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Tenant Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={tenantName}
        onChangeText={setTenantName}
        placeholderTextColor={colors.pink}
      />

      <Text>Tenant Email Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="example@example.com"
        value={tenantEmail}
        onChangeText={setTenantEmail}
        keyboardType="email-address"
        placeholderTextColor={colors.pink}
      />

      <Text>Tenant Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="123 Main St."
        value={tenantAddress}
        onChangeText={setTenantAddress}
        placeholderTextColor={colors.pink}
      />

      <Text>Tenant Phone:</Text>
      <TextInput
        style={styles.input}
        placeholder="1234567890"
        value={tenantPhone}
        onChangeText={setTenantPhone}
        keyboardType="numeric"
        placeholderTextColor={colors.pink}
      />

      <Text>Lease Start:</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={showStartDatePicker}>
        <Text style={styles.dateText}>{moment(leaseStart).format('MM/DD/YYYY')}</Text> {/* Format the date */}
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDate}
        onCancel={hideStartDatePicker}
      />

      <Text>Lease End:</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={showEndDatePicker}>
        <Text style={styles.dateText}>{leaseEnd ? moment(leaseEnd).format('MM/DD/YYYY') : 'Select Date'}</Text> {/* Format the date */}
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDate}
        onCancel={hideEndDatePicker}
      />

      <TouchableOpacity style={styles.squareButton} onPress={handleAddTenant}>
        <Text style={styles.buttonText}>Add Tenant</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearl,
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  datePickerButton: {
    marginVertical: 10,
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    color: 'white',
    fontSize: 16,
  },
  squareButton: {
    width: 125,
    height: 50,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
