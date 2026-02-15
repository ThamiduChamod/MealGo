import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import CartItem from '@/components/cartItem';
import { loadCartId } from '@/services/catService';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { findById } from '@/services/itemService';
import { useAuth } from '@/hooks/useAuth';
import CheckoutScreen from '../(ui)/CheckoutScreen';


// 💡 මෙතනට ඔයාගේ Theme එකේ පාටවල් දාගන්න
const PRIMARY_COLOR = '#FF6347'; // උදා: Tomato Red / Orange
const TEXT_COLOR = '#141414cc'; // Dark text color

type CartFood = {
  cart_id: string;
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients: any[];
  quantity: number;
};




const CartScreen = () => {
  const router = useRouter();
  const { user } = useAuth(); 
  const [deliveryFee, setDeliveryFee] = useState(250);

  const [cartItem, setCartItem] = useState({});
  const [cartItems, setCartItems] = useState<CartFood[]>([]);
  const [itemTotal, setItemTotal] = useState(0)


  

  // 💰 මුළු Cart එකේම එකතුව ගණනය කරන function එක
  const calculateSubtotal = (items: CartFood[]) => {
    const total = items.reduce((sum, item) => {
      return sum + (Number(item.price) * Number(item.quantity));
    }, 0);
    setItemTotal(total);
  };

  // 💡 Quantity එක Update කරන කොට subtotal එකත් update කරමු
  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      // අලුත් items list එක පාවිච්චි කරලා total එක හදන්න
      calculateSubtotal(updatedItems);
      return updatedItems;
    });
  };

  useEffect(() => {
    loadCart()
  },[])

  const loadCart = async () => {
    const food = await loadCartId();
    setCartItems(food);
    // මුලින්ම දත්ත ටික එද්දී total එක හදන්න
    calculateSubtotal(food);
  };
  const handelCheckOut =async ()=>{
    console.log("handel checkout")
    

  }
  

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
      {cartItems.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="cart-outline" size={80} color="gray" />
          <Text className="text-gray-500 text-lg mt-4">Your cart is empty!</Text>
        </View>
      ) : (
        <ScrollView className="flex-1 px-4 py-6">
          {cartItems.map((item) => (
            <CartItem 
              key={item.cart_id}
              item={item}
              onUpdate={(val) => updateQuantity(item.id, val)} // 👈 මෙන්න මේක අලුතින් දැම්මා
            />
          ))}
        </ScrollView>
      )}

      {/* Cart Summary & Checkout */}
      {cartItems.length > 0 && (
        <View className="bg-white p-6 shadow-lg rounded-t-3xl border-t border-gray-100">
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600 text-base">Subtotal</Text>
            <Text style={{ color: TEXT_COLOR }} className="text-base font-bold">LKR {itemTotal}</Text>
          </View>
          <View className="flex-row justify-between mb-4">
            <Text className="text-gray-600 text-base">Delivery</Text>
            <Text style={{ color: TEXT_COLOR }} className="text-base font-bold">LKR {deliveryFee}</Text>
          </View>
          <View className="flex-row justify-between items-center border-t border-gray-200 pt-4">
            <Text style={{ color: TEXT_COLOR }} className="text-xl font-extrabold">Total</Text>
            <Text style={{ color: PRIMARY_COLOR }} className="text-2xl font-extrabold">LKR {itemTotal + deliveryFee}</Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity 
            style={{ backgroundColor: PRIMARY_COLOR }} 
            className="flex-row items-center justify-center rounded-full py-4 mt-6 shadow-md"
            onPress={() => {
              if (cartItems.length === 0) return;
              router.push({
                pathname: "/(ui)/CheckoutScreen",
                params: {
                  Foods: JSON.stringify(cartItems),
                  subtotal: itemTotal,
                  qty: cartItems.reduce((sum, item) => sum + item.quantity, 0),
                  delivery: deliveryFee,
                  total: itemTotal + deliveryFee
              }
            })}}
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