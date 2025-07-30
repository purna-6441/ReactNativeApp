import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const AccountScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      {/* Header with Profile Picture on the left */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 24, paddingTop: 48 }}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={{ width: 72, height: 72, borderRadius: 36, borderWidth: 2, borderColor: '#2563EB' }}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 16 }}>Account</Text>
      </View>
      {/* Spacer to push content to bottom */}
      <View style={{ flex: 1 }} />
      {/* User Details and Logout at the bottom */}
      <View style={{ alignItems: 'center', marginBottom: 48 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>John Doe</Text>
        <Text style={{ color: '#888', marginBottom: 24 }}>johndoe@email.com</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 24, marginTop: 16 }}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen; 