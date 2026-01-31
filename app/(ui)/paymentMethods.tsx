import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('card1');
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const METHODS = [
    
    { id: 'card1', type: 'Visa', number: '**** **** **** 4522', expiry: '05/28', color: '#1a1a1a' },
    { id: 'card2', type: 'Mastercard', number: '**** **** **** 8890', expiry: '12/26', color: '#4158D0' },
  ];

  return (
    <View className="flex-1 bg-white">
        <View className="flex-row items-center px-6 py-4">
            <TouchableOpacity onPress={() => router.back()} className="bg-gray-100 p-2 rounded-full">
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-black ml-4 text-[#141414cc]">My Orders</Text>
        </View>
      <ScrollView showsVerticalScrollIndicator={false} className="px-6 py-4">
    
        {/* Other Payment Options */}
        <Text className="text-gray-400 font-bold mb-4 uppercase tracking-wider">Other Options</Text>
        <View className="bg-gray-50 rounded-[30px] p-4 mb-10">
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <Ionicons name="cash-outline" size={24} color="#4CAF50" />
              <Text className="ml-4 font-bold text-gray-700">Cash on Delivery</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View>\
            <Text className="text-gray-400 font-bold mb-4 uppercase tracking-wider">Saved Cards</Text>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView className="px-6">

                {/* Form Inputs */}
                <View className="mt-10">
                    <Text className="text-gray-400 font-bold mb-2 ml-1">Card Number</Text>
                    <View className="bg-gray-50 rounded-2xl px-4 py-1 mb-5 border border-gray-100">
                    <TextInput 
                        placeholder="1234 5678 9101 1121" 
                        keyboardType="numeric"
                        maxLength={16}
                        onChangeText={setCardNumber}
                        className="py-3 text-lg font-bold"
                    />
                    </View>

                    <Text className="text-gray-400 font-bold mb-2 ml-1">Card Holder Name</Text>
                    <View className="bg-gray-50 rounded-2xl px-4 py-1 mb-5 border border-gray-100">
                    <TextInput 
                        placeholder="Saman Kumara" 
                        onChangeText={setHolderName}
                        className="py-3 text-lg font-bold uppercase"
                    />
                    </View>

                    <View className="flex-row">
                    <View className="flex-1 mr-2">
                        <Text className="text-gray-400 font-bold mb-2 ml-1">Expiry Date</Text>
                        <View className="bg-gray-50 rounded-2xl px-4 py-1 border border-gray-100">
                        <TextInput 
                            placeholder="MM/YY" 
                            maxLength={5}
                            onChangeText={setExpiry}
                            className="py-3 text-lg font-bold"
                        />
                        </View>
                    </View>
                    <View className="flex-1 ml-2">
                        <Text className="text-gray-400 font-bold mb-2 ml-1">CVV</Text>
                        <View className="bg-gray-50 rounded-2xl px-4 py-1 border border-gray-100">
                        <TextInput 
                            placeholder="***" 
                            keyboardType="numeric"
                            maxLength={3}
                            secureTextEntry
                            onChangeText={setCvv}
                            className="py-3 text-lg font-bold"
                        />
                        </View>
                    </View>
                    </View>
                </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {/* Save Button */}
            <View className="p-6">
                <TouchableOpacity 
                className="bg-orange-500 py-5 rounded-[25px] items-center shadow-lg shadow-orange-300"
                //   onPress={}
                >
                <Text className="text-white text-lg font-black uppercase tracking-widest">Add Card</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;