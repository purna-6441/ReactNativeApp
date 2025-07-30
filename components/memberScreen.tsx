import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { theme, colors } from '../assets/Style/theme';

interface Member {
  id: number;
  name: string;
  membershipType: string;
  joinDate: string;
  status: string;
  email: string;
  points: number;
}

const memberData: Member[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    membershipType: 'Premium',
    joinDate: '2023-01-15',
    status: 'Active',
    email: 'alice.johnson@email.com',
    points: 2500
  },
  {
    id: 2,
    name: 'Bob Smith',
    membershipType: 'Gold',
    joinDate: '2022-08-20',
    status: 'Active',
    email: 'bob.smith@email.com',
    points: 1800
  },
  {
    id: 3,
    name: 'Carol Davis',
    membershipType: 'Silver',
    joinDate: '2023-03-10',
    status: 'Active',
    email: 'carol.davis@email.com',
    points: 950
  },
  {
    id: 4,
    name: 'David Wilson',
    membershipType: 'Basic',
    joinDate: '2023-06-05',
    status: 'Expired',
    email: 'david.wilson@email.com',
    points: 450
  },
  {
    id: 5,
    name: 'Emma Brown',
    membershipType: 'Premium',
    joinDate: '2022-12-01',
    status: 'Active',
    email: 'emma.brown@email.com',
    points: 3200
  }
];

const MemberScreen = () => {
  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'Premium': return '#FFD700';
      case 'Gold': return '#FFA500';
      case 'Silver': return '#C0C0C0';
      default: return '#87CEEB';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? '#4CAF50' : '#F44336';
  };

  const renderMember = ({ item }: { item: Member }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberHeader}>
        <View style={[styles.membershipBadge, { backgroundColor: getMembershipColor(item.membershipType) }]}>
          <Text style={styles.membershipText}>{item.membershipType}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.memberName}>{item.name}</Text>
      <Text style={styles.memberEmail}>{item.email}</Text>
      <View style={styles.memberDetails}>
        <Text style={styles.memberJoinDate}>Joined: {item.joinDate}</Text>
        <Text style={styles.memberPoints}>Points: {item.points}</Text>
      </View>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Members</Text>
      <FlatList
        data={memberData}
        renderItem={renderMember}
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
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  membershipBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  membershipText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  memberEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  memberDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  memberJoinDate: {
    fontSize: 12,
    color: '#888',
  },
  memberPoints: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MemberScreen;