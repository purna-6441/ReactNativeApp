import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard, { Product } from '../components/ProductCard';

const { width } = Dimensions.get('window');
const numColumns = 2;
const CARD_WIDTH = width / numColumns - 20;

const FavoriteProductsView = ({ navigation }: { navigation: any }) => {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Products</Text>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorite products yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
              <ProductCard item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EFFF', // Soft Lavender
    paddingTop: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#A259F7', // Vivid Purple
    alignSelf: 'center',
  },
  empty: {
    fontSize: 16,
    color: '#22223B',
    textAlign: 'center',
    marginTop: 32,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
});

export default FavoriteProductsView; 