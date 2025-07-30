import React from 'react';
import { SafeAreaView, View, Text, Image, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Share, ImageBackground } from 'react-native';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { theme, colors } from '../assets/Style/theme';

const { width } = Dimensions.get('window');
const bgImage = require('../assets/Images/backgroundImage.jpg');

const ProductDetailsScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: product.productName,
      headerTitleAlign: 'center',
    });
  }, [navigation, product.productName]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${product.productName} - ₹${Number(product.productRate || 0).toFixed(2)}\n${product.productDescription}`,
        url: product.productImage,
        title: product.productName,
      });
    } catch (error) {
      // Optionally handle error
    }
  };

  return (
    <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
      <SafeAreaView style={[theme.screen, { backgroundColor: 'transparent' }] }>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={[theme.card, styles.detailsContainer]}>
          {product.illustration ? (
            <product.illustration style={styles.detailsImage} />
          ) : (
            <Image source={{ uri: product.productImage }} style={styles.detailsImage} />
          )}
          <Text style={[theme.header, styles.detailsName]}>{product.productName}</Text>
          <Text style={[styles.detailsPrice, { color: colors.primary }]}>₹{Number(product.productRate || 0).toFixed(2)}</Text>
          <Text style={[theme.textSecondary, styles.detailsDescription]}>{product.productDescription}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={theme.button} onPress={() => addToCart(product)}>
              <Text style={theme.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => toggleFavorite(product)}>
              <Text style={{ fontSize: 22, color: isFavorite((product.productId ?? '').toString()) ? colors.accent : '#bbb' }}>
                {isFavorite(product.productId) ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={handleShare}>
              <Text style={{ fontSize: 22, color: colors.accent }}>🔗</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    margin: 16,
  },
  detailsImage: {
    width: width - 64,
    height: width - 64,
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  detailsName: {
    marginBottom: 8,
    textAlign: 'center',
  },
  detailsPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  detailsDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  iconBtn: {
    backgroundColor: 'transparent',
    borderRadius: 22,
    padding: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductDetailsScreen; 