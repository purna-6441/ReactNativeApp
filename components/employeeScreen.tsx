import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { theme, colors } from '../assets/Style/theme';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
}

const employeeData: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'IT',
    email: 'john.doe@company.com',
    phone: '+1-234-567-8901'
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Product Manager',
    department: 'Product',
    email: 'jane.smith@company.com',
    phone: '+1-234-567-8902'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    position: 'UX Designer',
    department: 'Design',
    email: 'mike.johnson@company.com',
    phone: '+1-234-567-8903'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    position: 'HR Manager',
    department: 'Human Resources',
    email: 'sarah.wilson@company.com',
    phone: '+1-234-567-8904'
  }
];

const EmployeeScreen = () => {
  const renderEmployee = ({ item }: { item: Employee }) => (
    <View style={styles.employeeCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <Text style={styles.employeePosition}>{item.position}</Text>
        <Text style={styles.employeeDepartment}>{item.department}</Text>
        <Text style={styles.employeeEmail}>{item.email}</Text>
        <Text style={styles.employeePhone}>{item.phone}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Employee Directory</Text>
      <FlatList
        data={employeeData}
        renderItem={renderEmployee}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  employeeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  employeePosition: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 2,
  },
  employeeDepartment: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  employeeEmail: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  employeePhone: {
    fontSize: 12,
    color: '#888',
  },
});

export default EmployeeScreen;