import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { theme, colors } from '../assets/Style/theme';

export type Product = {
  ProductId: number;
  ProductName: string;
  ProductRate: number;
  ProductImage: string;
  ProductDescription: string;
  // illustration?: React.ComponentType<any>;
  // category: string; // Added for filtering
};

const CARD_RADIUS = 18;
const IMAGE_HEIGHT = 80;
const { width } = Dimensions.get('window');
const numColumns = 2;
const CARD_WIDTH = width / numColumns - 24;

const ProductCard = ({ item, onAddToCart }: { item: Product; onAddToCart?: () => void }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  // Removed Illustration and image rendering
  return (
    <View style={[theme.card, styles.card]}>
      {item.ProductImage ? (
      <Image
        source={{ uri: item.ProductImage }}
          style={{ width: 80, height: 80, borderRadius: 8, marginBottom: 8 }}
          resizeMode="cover"
         />
        ) : null}
      <Text style={[theme.header, styles.name]} numberOfLines={1}>{item.ProductName}</Text>
      <Text style={[styles.price, { color: colors.primary }]}>{`₹${Number(item.ProductRate || 0).toFixed(2)}`}</Text>
      <Text style={[theme.textSecondary, styles.description]} numberOfLines={2}>{item.ProductDescription}</Text>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.cartButton} onPress={onAddToCart} activeOpacity={0.8}>
          <Text style={theme.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(item)} activeOpacity={0.7}>
          <Text style={{ fontSize: 22, color: isFavorite((item.ProductId ?? '').toString()) ? colors.accent : '#bbb' }}>
            {isFavorite((item.ProductId ?? '').toString()) ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    width: CARD_WIDTH,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // Removed imageContainer and image styles if not needed
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10,
    minHeight: 32,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    width: '100%',
  },
  cartButton: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginRight: 8,
    minWidth: 90,
  },
  heartIcon: {
    padding: 4,
    marginLeft: 0,
    backgroundColor: 'transparent',
  },
});

export default ProductCard; 