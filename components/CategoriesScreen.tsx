import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image, FlatList } from 'react-native';
import { theme, colors } from '../assets/Style/theme';
import { PRODUCTS } from '../constants/products';

const categories = [
  { key: 'men', label: 'Men', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
  { key: 'women', label: 'Women', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80' },
  { key: 'children', label: 'Children / Infants', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=200&q=80' },
  { key: 'footwear', label: 'Footwear', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80' },
  { key: 'accessories', label: 'Accessories', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=200&q=80' },
  { key: 'jewellery', label: 'Jewellery', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80' },
  { key: 'home', label: 'Home & Lifestyle', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80' },
];

const CategoriesScreen = ({ navigation }: { navigation: any }) => {
  // Pick a random product
  const randomProduct = useMemo(() => {
    const idx = Math.floor(Math.random() * PRODUCTS.length);
    return PRODUCTS[idx];
  }, []);

  return (
    <SafeAreaView style={theme.screen}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.welcome}>Shop by category</Text>
      <Text style={styles.subtitle}>Select a category to start shopping</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.key}
        numColumns={2}
        contentContainerStyle={styles.categoriesGrid}
        renderItem={({ item: cat }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Home', { category: cat.key })}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={{ uri: cat.image }}
                style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 10 }}
                resizeMode="cover"
              />
              <Text style={styles.categoryText}>{cat.label}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  categoriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    paddingRight: 10,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    flex: 1,
    minHeight: 110,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0', // light gray
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    marginHorizontal: 18,
    marginTop: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0', // light gray
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 6,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 8,
    textAlign: 'center',
  },
  productDesc: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  categoriesGrid: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 30,
  },
});

export default CategoriesScreen; 