import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import CartItem from '@/components/cartItem';

// 💡 මෙතනට ඔයාගේ Theme එකේ පාටවල් දාගන්න
const PRIMARY_COLOR = '#FF6347'; // උදා: Tomato Red / Orange
const TEXT_COLOR = '#141414cc'; // Dark text color

// Dummy Cart Data (පස්සේ ඔයාට මේක Redux හෝ Context API එකකින් manage කරන්න පුළුවන්)
const DUMMY_CART_ITEMS = [
  {
    id: '1',
    name: 'Classic Beef Burger',
    price: 1250,
    quantity: 1,
    image: require('@/assets/images/b2.png'), // ඔයාගේ image path එක
  },
  {
    id: '2',
    name: 'Spicy Zinger Burger',
    price: 1100,
    quantity: 2,
    image: require('@/assets/images/b2.png'), // ඔයාගේ image path එක
  },
  {
    id: '3',
    name: 'Cheesy Fries',
    price: 450,
    quantity: 1,
    image: require('@/assets/images/b2.png'), // තව image path එකක්
  },
];

const CartScreen = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState(DUMMY_CART_ITEMS);

  // 💡 ඕනෑම Item එකක Quantity එක Update කරන Function එක
  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 💰 Total එක ගණනය කිරීම (හැමවෙලේම auto update වෙනවා)
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);


  // මුළු Cart එකේම එකතුව ගණනය කිරීම
  // const subtotal = DUMMY_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 250; // උදාහරණයක්
  const total = subtotal + deliveryFee;
  

  return (
    <View className="flex-1 bg-white ">
      <StatusBar  />
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 relative w-full top-0 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={TEXT_COLOR} />
        </TouchableOpacity>
        <Text style={{ color: TEXT_COLOR }} className="text-xl font-bold">Cart</Text>
      </View>

      {/* Cart Items List */}
      {DUMMY_CART_ITEMS.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="cart-outline" size={80} color="gray" />
          <Text className="text-gray-500 text-lg mt-4">Your cart is empty!</Text>
        </View>
      ) : (
        <ScrollView className="flex-1 px-4 py-6">
          {cartItems.map((item) => (
            <CartItem 
              key={item.id}
              item={item}
              onUpdate={(val) => updateQuantity(item.id, val)} // 👈 මෙන්න මේක අලුතින් දැම්මා
            />
          ))}
        </ScrollView>
      )}

      {/* Cart Summary & Checkout */}
      {DUMMY_CART_ITEMS.length > 0 && (
        <View className="bg-white p-6 shadow-lg rounded-t-3xl border-t border-gray-100">
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600 text-base">Subtotal</Text>
            <Text style={{ color: TEXT_COLOR }} className="text-base font-bold">LKR {subtotal.toLocaleString()}</Text>
          </View>
          <View className="flex-row justify-between mb-4">
            <Text className="text-gray-600 text-base">Delivery</Text>
            <Text style={{ color: TEXT_COLOR }} className="text-base font-bold">LKR {deliveryFee.toLocaleString()}</Text>
          </View>
          <View className="flex-row justify-between items-center border-t border-gray-200 pt-4">
            <Text style={{ color: TEXT_COLOR }} className="text-xl font-extrabold">Total</Text>
            <Text style={{ color: PRIMARY_COLOR }} className="text-2xl font-extrabold">LKR {total.toLocaleString()}</Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity 
            style={{ backgroundColor: PRIMARY_COLOR }} 
            className="flex-row items-center justify-center rounded-full py-4 mt-6 shadow-md"
            onPress={() => { /* Checkout logic here */ }}
          >
            <Ionicons name="lock-closed" size={20} color="white" className="mr-2" />
            <Text className="text-white text-xl font-bold ml-2">Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;