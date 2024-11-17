import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';  // Import Swipeable component

export default function OwnerDashboard({ route }) {
  const navigation = useNavigation();
  const [tenantDetails, setTenantDetails] = useState(null); // Modal state
  const [tenants, setTenants] = useState(route?.params?.tenants || []); // Keep tenants list
  const [payments, setPayments] = useState(5000); // Example total payments
  const [pendingPayments, setPendingPayments] = useState(2000); // Example pending payments
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    { id: 1, status: 'Pending' },
    { id: 2, status: 'Completed' },
  ]); // Example maintenance requests
  const [maintenanceBudget, setMaintenanceBudget] = useState(5000); // Example maintenance budget
  const [currentSpending, setCurrentSpending] = useState(1500); // Example current spending

  // Function to handle tenant block click to show details
  const showTenantDetails = (tenant) => {
    setTenantDetails(tenant);
  };

  // Function to delete tenant
  const deleteTenant = (tenantIndex) => {
    const updatedTenants = tenants.filter((_, index) => index !== tenantIndex);
    setTenants(updatedTenants);
  };

  // Render Right Action for swipe (Delete tenant)
  const renderRightActions = (tenantIndex) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTenant(tenantIndex)}  // Delete tenant on swipe
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.textHome}>Welcome to Owner Dashboard!</Text>

        {/* Tenant Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tenant Overview</Text>
          {tenants.length === 0 ? (
            <Text style={styles.noTenantsText}>No tenants added yet.</Text>
          ) : (
            tenants.map((tenant, index) => (
              <Swipeable
                key={index}
                renderRightActions={() => renderRightActions(index)}  // Swipe action
              >
                <TouchableOpacity
                  style={styles.tenantBlock}
                  onPress={() => showTenantDetails(tenant)}
                >
                  <Text style={styles.tenantName}>{tenant.name}</Text>
                  <Text style={styles.paymentStatus}>
                    {tenant.paymentStatus || 'Unpaid'}
                  </Text>
                </TouchableOpacity>
              </Swipeable>
            ))
          )}
        </View>

        {/* Add Tenant Button */}
        <TouchableOpacity
          style={styles.squareButton}
          onPress={() => navigation.navigate('TenantList', { tenants, setTenants })}
        >
          <Text style={styles.buttonText}>Add Tenant</Text>
        </TouchableOpacity>

        {/* Payment Tracking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Tracking</Text>
          <Text>Total Payments: ${payments}</Text>
          <Text>Payments Pending: ${pendingPayments}</Text>
          <TouchableOpacity
            style={styles.squareButton}
            onPress={() => console.log('Generate Report')}
          >
            <Text style={styles.buttonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>

        {/* Maintenance Requests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maintenance Requests</Text>
          {maintenanceRequests.map((request) => (
            <Text key={request.id}>
              Request {request.id}: {request.status}
            </Text>
          ))}
          <TouchableOpacity
            style={styles.squareButton}
            onPress={() => console.log('Prioritize Requests')}
          >
            <Text style={styles.buttonText}>Prioritize Requests</Text>
          </TouchableOpacity>
        </View>

        {/* Budgeting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budgeting</Text>
          <Text>Maintenance Budget: ${maintenanceBudget}</Text>
          <Text>Current Spending: ${currentSpending}</Text>
          <TouchableOpacity
            style={styles.squareButton}
            onPress={() => console.log('Adjust Budget')}
          >
            <Text style={styles.buttonText}>Adjust Budget</Text>
          </TouchableOpacity>
        </View>

        {/* Analytics/Reports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analytics/Reports</Text>
          <Text>Property Performance Metrics</Text>
          <Text>Trends & Insights</Text>
        </View>

        {/* Tenant Details Modal */}
        {tenantDetails && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={tenantDetails !== null}
            onRequestClose={() => setTenantDetails(null)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Tenant Details</Text>
                <Text>Name: {tenantDetails.name}</Text>
                <Text>Email: {tenantDetails.email}</Text>
                <Text>Address: {tenantDetails.address}</Text>
                <Text>Phone: {tenantDetails.phone}</Text>
                <Text>Lease Start: {tenantDetails.leaseStart ? tenantDetails.leaseStart.toLocaleDateString() : 'N/A'}</Text>
                <Text>Lease End: {tenantDetails.leaseEnd ? tenantDetails.leaseEnd.toLocaleDateString() : 'N/A'}</Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setTenantDetails(null)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearl,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'flex-start', // Keeps content starting at the top
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textHome: {
    fontSize: 24,
    marginVertical: 20,
    color: colors.black,
    textAlign: 'center',
  },
  squareButton: {
    width: 125,
    height: 50,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tenantBlock: {
    backgroundColor: colors.green,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: '80%', // Adjust width to keep it centered
  },
  tenantName: {
    color: 'white',
    fontSize: 18,
  },
  paymentStatus: {
    color: 'white',
    fontSize: 14,
  },
  noTenantsText: {
    fontSize: 18,
    color: colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999, // Ensure the modal is above all other content
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    zIndex: 1000, // Ensure modal content is clickable and above the background
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});
