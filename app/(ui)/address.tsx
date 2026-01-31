import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AddressScreen = () => {
  const router = useRouter();
  const [addressType, setAddressType] = useState('Home'); // Home, Office, Other

  // ⌨️ Custom Input Component for reuse
  const AddressInput = ({ label, placeholder, icon, keyboardType = 'default' }: any) => (
    <View className="mb-5">
      <Text className="text-gray-400 font-bold mb-2 ml-1">{label}</Text>
      <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-1">
        <Ionicons name={icon} size={20} color="#FF6347" />
        <TextInput 
          placeholder={placeholder}
          keyboardType={keyboardType}
          className="flex-1 ml-3 py-3 text-gray-700 font-medium"
          placeholderTextColor="#ccc"
        />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="bg-gray-100 p-2 rounded-full">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-black ml-4 text-[#141414cc]">Delivery Address</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="px-6 ">
          
          {/* 🗺️ Mini Map Placeholder (මෙතනට Google Maps දාන්න පුළුවන්) */}
          <View className="w-full h-48 bg-gray-100 rounded-[30px] mt-4 overflow-hidden items-center justify-center border border-gray-200">
            <Ionicons name="map-outline" size={40} color="#ccc" />
            <Text className="text-gray-400 mt-2 font-medium">Map View Coming Soon</Text>
            {/* ඇත්තටම Map එකක් දානවා නම් react-native-maps පාවිච්චි කරන්න */}
          </View>

          {/* Address Type Selection */}
          <View className="flex-row mt-8 justify-between">
            {['Home', 'Office', 'Other'].map((type) => (
              <TouchableOpacity 
                key={type}
                onPress={() => setAddressType(type)}
                className={`flex-1 py-3 mx-1 rounded-2xl items-center border ${
                  addressType === type ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-200'
                }`}
              >
                <Text className={`font-bold ${addressType === type ? 'text-white' : 'text-gray-500'}`}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Input Fields */}
          <View className="mt-8 space-y-4">
            <AddressInput label="Full Name" placeholder="Saman Kumara" icon="person-outline" />
            <AddressInput label="Street Address" placeholder="123, Galle Road" icon="location-outline" />
            <AddressInput label="City" placeholder="Colombo" icon="business-outline" />
            <AddressInput label="Phone Number" placeholder="+94 77 123 4567" icon="call-outline" keyboardType="phone-pad" />
          </View>

          <View className="h-10" />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Save Button */}
      <View className="px-6 py-6 border-t border-gray-100">
        <TouchableOpacity 
          className="bg-orange-500 py-5 rounded-[25px] items-center shadow-lg shadow-orange-300"
          onPress={() => router.back()}
        >
          <Text className="text-white text-lg font-black uppercase tracking-widest">Save Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default AddressScreen;