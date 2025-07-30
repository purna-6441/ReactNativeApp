import React from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, StatusBar, StyleSheet, Text, ImageBackground } from 'react-native';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from './ProductCard';
import { fetchProductsByCategory } from '../api/productsApi';
import { PRODUCTS } from '../constants/products';
import { theme, colors } from '../assets/Style/theme';

const HomeScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const { addToCart, cart } = useCart();
  const { favorites } = useFavorites();

  const selectedCategory = route?.params?.category;

  const [products, setProducts] = React.useState([]);
  const [startIndex, setStartIndex] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const mapProduct = (p: any) => ({
    ...p,
    ProductName: p.productName || p.name || '',
    ProductRate: p.productRate || p.price || 0,
    ProductId: p.productId || p.id || '',
    ProductImage: p.productImage || p.image || '',
    ProductDescription: p.productDescription || p.description || '',
  });

  const loadProducts = async (reset = false) => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextIndex = reset ? 1 : startIndex + 10;
    try {
      const apiProducts = await fetchProductsByCategory(selectedCategory, nextIndex);
      const newProducts = apiProducts.map(mapProduct);
      setProducts(prev =>
        reset ? newProducts : [...prev, ...newProducts]
      );
      setStartIndex(nextIndex);
      setHasMore(newProducts.length > 0);
    } catch (e) {
      // handle error
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setProducts([]);
    setStartIndex(1);
    setHasMore(true);
    loadProducts(true);
  }, [selectedCategory]);

  React.useLayoutEffect(() => {
    const categoryNames: Record<string, string> = {
      men: 'Men',
      women: 'Women',
      children: 'Children / Infants',
      footwear: 'Footwear',
      accessories: 'Accessories',
      jewellery: 'Jewellery',
      home: 'Home & Lifestyle',
    };
    const title = selectedCategory ? (categoryNames[selectedCategory] || 'Products') : 'Products';
    navigation.setOptions({
      headerTitle: title,
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('FavoriteProducts')} style={{ marginRight: 16 }}>
            <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 24, color: colors.accent }}>♥</Text>
              {favorites.length > 0 && (
                <View style={{
                  position: 'absolute',
                  top: -4,
                  right: -10,
                  backgroundColor: colors.accent,
                  borderRadius: 8,
                  minWidth: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 3,
                }}>
                  <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>{`${favorites.length}`}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 8 }}>
            <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 24, color: colors.primary }}>🛒</Text>
              {cart.length > 0 && (
                <View style={{
                  position: 'absolute',
                  top: -4,
                  right: -10,
                  backgroundColor: colors.primary,
                  borderRadius: 8,
                  minWidth: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 3,
                }}>
                  <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>{`${cart.length}`}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, cart.length, favorites.length, selectedCategory]);

  const bgImage = require('../assets/Images/backgroundImage.jpg');

  return (
    <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
      <SafeAreaView style={[theme.screen, { backgroundColor: 'transparent' }] }>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        {products.length === 0 && !loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
            
            <Text style={{ fontSize: 18, color: colors.textSecondary, marginBottom: 24, textAlign: 'center' }}>
              No products found for this category.
            </Text>
            {/* Dummy Product Card */}
            <View style={{ width: '90%' }}>
              <ProductCard item={{
                ProductId: 0,
                ProductName: 'Coming Soon!',
                ProductRate: 0,
                ProductImage: '',
                ProductDescription: 'Products for this category will be available soon.',
                //category: selectedCategory || '',
              }} />
            </View>
          </View>
        ) : (
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
                <ProductCard item={item} onAddToCart={() => addToCart(item)} />
              </TouchableOpacity>
            )}
            keyExtractor={(item: any) => item.ProductId?.toString() || Math.random().toString()}
            numColumns={2}
            contentContainerStyle={[styles.list, { paddingTop: 8, paddingBottom: 32 }]}
            showsVerticalScrollIndicator={false}
            onEndReached={() => loadProducts(false)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <Text style={{textAlign:'center'}}>Loading...</Text> : null}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
  },
});

export default HomeScreen; 