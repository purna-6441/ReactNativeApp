/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import ProductCard, { Product } from './components/ProductCard';
import { CartProvider } from './context/CartContext';
import CartView from './components/CartView';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoriteProductsView from './favorites/FavoriteProductsView';
import HomeScreen from './components/HomeScreen';
import ProductDetailsScreen from './components/ProductDetailsScreen';
import { PRODUCTS, numColumns } from './constants/products';
import LoginScreen from './components/LoginScreen';
import CategoriesScreen from './components/CategoriesScreen';
import AccountScreen from './components/AccountScreen';
import xyzScreen from './components/xyzScreen';
import EmployeeScreen from './components/employeeScreen';
import MemberScreen from './components/memberScreen';
import UserProfileScreen from './components/userProfileScreen';
import SettingsScreen from './components/settingsScreen';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create the main tabs component
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#A259F7',
        tabBarInactiveTintColor: '#gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Employee" 
        component={EmployeeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👥</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Member" 
        component={MemberScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏆</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="xyzScreen" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen
              name="Categories"
              component={CategoriesScreen}
              options={({ navigation }) => ({
                title: 'Shop by Category',
                headerShown: true,
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginRight: 16 }}>
                    <Text style={{ color: '#A259F7', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="Home" component={HomeScreen}  />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
            <Stack.Screen name="Cart" component={CartView} options={{ title: 'Your Cart' }} />
            <Stack.Screen name="FavoriteProducts" component={FavoriteProductsView} options={{ title: 'Favorites' }} />
            <Stack.Screen name="Account" component={AccountScreen} options={{ title: 'Account' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    alignSelf: 'center',
    color: '#222',
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    margin: 8,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  detailsImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  detailsName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  detailsPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  detailsDescription: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
});
