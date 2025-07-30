import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useCart } from '../context/CartContext';
import { Product } from './ProductCard';
import { useNavigation } from '@react-navigation/native';

const CartView = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.ProductRate || 0) * item.quantity, 0);
  const navigation = useNavigation();
  const [paymentModalVisible, setPaymentModalVisible] = React.useState(false);

  const handlePay = () => {
    clearCart();
    setPaymentModalVisible(true);
  };

  const handleContinueShopping = () => {
    setPaymentModalVisible(false);
    (navigation as any).navigate('Categories');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.ProductId.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Image source={{ uri: item.ProductImage }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.ProductName}</Text>
                  <Text style={styles.price}>₹{Number(item.ProductRate || 0).toFixed(2)} x {item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.ProductId)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
        </>
      )}
      <Modal
        visible={paymentModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Payment is completed</Text>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinueShopping}>
              <Text style={styles.continueButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EFFF', // Soft Lavender
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#A259F7', // Vivid Purple
    alignSelf: 'center',
  },
  empty: {
    fontSize: 16,
    color: '#22223B',
    textAlign: 'center',
    marginTop: 32,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#E0E7FF', // Light blue accent
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22223B',
  },
  price: {
    fontSize: 14,
    color: '#A259F7', // Vivid Purple
    marginTop: 2,
  },
  remove: {
    color: '#4FC3F7', // Sky Blue
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22223B',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A259F7', // Vivid Purple
  },
  payButton: {
    backgroundColor: '#A259F7',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    width: 280,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#22223B',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#A259F7',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default CartView; 