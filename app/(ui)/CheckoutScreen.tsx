// app/checkout.tsx (හෝ ඔයාගේ path එක)
import React, { use, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getUserAddress } from '@/services/profileService';
import { placeOrder } from '@/services/orderService';
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
const CheckoutScreen = () => {
  const router = useRouter();
  const { total, qty,  subtotal, Foods } = useLocalSearchParams(); // Cart එකෙන් එවන දත්ත
  const QTY = Number(qty) || 0;
  
  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' හෝ 'CARD'

  const [selectedAddress, setSelectedAddress] = useState<any>([]); // දැනට dummy
  const [address, setAddress] = useState<any>([]); // Firestore එකෙන් ලැබෙන address data
  const [selectedType, setSelectedType] = useState('Home'); // Home, Office, Other
  const [cartItems, setCartItems] = useState<CartFood[]>([]);

  useEffect(() => {
    if (Foods) {
      try {
        // 💡 String එක ආපහු Object/Array එකක් කරමු
        const parsedFoods = JSON.parse(Foods as string);
        setCartItems(parsedFoods);
        console.log(parsedFoods)
      } catch (e) {
        console.error("Error parsing foods:", e);
      }
    }
  }, [Foods]);

  const conformOrder = async () => {
    console.log("Selected Address ID:", selectedAddress.id);
    placeOrder(selectedAddress.id, cartItems);
    Alert.alert("Success", "Your order has been placed! 🎉", [
      { text: "OK", onPress: () => router.replace('/') }
    ]);
  };

  useEffect(() => {
    const initializeCheckout = async () => {
    const userAddress = await getUserAddress();
    
    if (userAddress.length === 0) {
      Alert.alert("No Address Found", "Please add a delivery address to proceed.", [
        { text: "Add Address", onPress: () => router.push('/address') }
      ]);
      return;
    }

    setAddress(userAddress);

    const defaultAddress = userAddress.find((add: any) => add.addressType === 'Home');
    
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    } else if (userAddress.length > 0) {
      setSelectedAddress(userAddress[0]);
      console.log("adddddddddddddddddddddddddd",userAddress[0])
      // setSelectedType(userAddress[0].data().addressType);
    }
  };

  initializeCheckout();

  }, [])

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    const found = address.find((add: any) => add.addressType === type);
    if (found) {
      setSelectedAddress(found);
    } else {
      // ඒ වර්ගයේ ඇඩ්‍රස් එකක් නැත්නම් හිස් කරන්න හෝ මැසේජ් එකක් දෙන්න
      setSelectedAddress({});
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6 h-full">
      {/* <Text className="text-2xl font-black mb-6 mt-10"></Text> */}
      <View className="flex-row items-center py-4 w-full justify-between mb-4">
        <TouchableOpacity onPress={() => router.push('/cart')} className="bg-gray-100 p-2 rounded-full">
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
          <Text className="text-2xl justify-end font-black ml- align-middle flex text-[#141414cc]">Checkout</Text>
      </View>

      

      {/* 📍 Delivery Address Section */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-gray-500 font-bold uppercase tracking-wider">Delivery Address</Text>
          
          {/* Edit Address Button - මේකෙන් තමයි කලින් හදපු Screen එකට යන්නේ */}
          <TouchableOpacity onPress={() => router.push('/address')}>
            <Text className="text-orange-500 font-bold">Edit Address</Text>
          </TouchableOpacity>
        </View>

        {/* Address Type Selector (Chips) */}
        <View className="flex-row mb-4">
          {['Home', 'Office', 'Other'].map((type) => (
            <TouchableOpacity 
              key={type}
              onPress={async () => {
                setSelectedType(type)
                handleTypeChange(type)
              }}
              className={`px-6 py-2 rounded-full mr-2 border ${
                selectedType === type ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-200'
              }`}
            >
              <Text className={`font-bold ${selectedType === type ? 'text-white' : 'text-gray-500'}`}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Address Display Card */}
        <View className="flex-row items-center p-5 bg-gray-50 rounded-[25px] border border-gray-100 shadow-sm">
          <View className="bg-orange-100 p-3 rounded-2xl top-0 align-top">
            <Ionicons 
              name={selectedType === 'Home' ? 'home' : selectedType === 'Office' ? 'business' : 'location'} 
              size={24} 
              color="#FF6347" 
            />
          </View>
          
          <View className="ml-4 flex-1">
            <Text className="font-extrabold text-lg text-[#141414cc]">
              {selectedType} Address
            </Text>
            <Text className="text-gray-500 leading-5">
              {selectedAddress.fullName ? selectedAddress.fullName : "No address found for this type."}
            </Text>
            <Text className="text-gray-500 leading-5">
              {selectedAddress.address},{"\n"}{selectedAddress.city}
            </Text>
            <Text className="text-gray-500 mt-1">{selectedAddress.phone}</Text>
          </View>
        </View>
      </View>

      {/* 💳 Payment Method Section */}
      <View className="mb-10">
        <Text className="text-gray-500 font-bold mb-3">PAYMENT METHOD</Text>
        
        <TouchableOpacity 
          onPress={() => setPaymentMethod('COD')}
          className={`flex-row items-center p-4 rounded-2xl mb-3 border ${paymentMethod === 'COD' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-gray-50'}`}
        >
          <Ionicons name="cash-outline" size={24} color={paymentMethod === 'COD' ? "#FF6347" : "gray"} />
          <Text className="ml-3 font-bold">Cash on Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setPaymentMethod('CARD')}
          className={`flex-row items-center p-4 rounded-2xl border ${paymentMethod === 'CARD' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-gray-50'}`}
        >
          <Ionicons name="card-outline" size={24} color={paymentMethod === 'CARD' ? "#FF6347" : "gray"} />
          <Text className="ml-3 font-bold">Credit / Debit Card</Text>
        </TouchableOpacity>
      </View>

      {/* 🧾 Order Summary */}
      <View className="p-4 bg-gray-50 rounded-3xl mb-8">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">Order Total</Text>
          <Text className="font-bold text-lg">LKR {total}</Text>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity 
        onPress={conformOrder}
        className="bg-orange-500 py-5 rounded-[25px] items-center bottom-0 justify-center mb-10"
      >
        <Text className="text-white text-xl font-black uppercase tracking-widest">Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CheckoutScreen;