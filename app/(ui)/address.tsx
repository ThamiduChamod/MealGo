import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { saveAddress } from '@/services/profileService';
import { useLoader } from '@/hooks/useLoader';

const AddressScreen = () => {
  const router = useRouter();
  const [addressType, setAddressType] = useState('Home'); // Home, Office, Other
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");  
  const { showLoader, hideLoader, isLoading} =useLoader()
  
  console.log("Address Type:", fullName);

  const handleSavAddress = async () => {
    // මෙතනට Save Address function එකක් implement කරන්න
    console.log("Saving Address:", { fullName, address, city, phone, addressType });

    if(!fullName || !address || !city || !phone){
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      showLoader()
      await saveAddress(fullName, address, city, phone, addressType)  
      Alert.alert("Success", "Address Saved Successfully");
    } catch (error) {
      hideLoader()
      Alert.alert("Error", "Failed to save address: " );
      console.log("Failed to save address:", error)
    }finally{
      hideLoader()
    }
    
    
  }



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
          <View className="mt-8">
            {/* Full Name */}
            <View className="mb-5">
              <Text className="text-gray-400 font-bold mb-2 ml-1">Full Name</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-1">
                <Ionicons name="person-outline" size={20} color="#FF6347" />
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Saman Kumara"
                  className="flex-1 ml-3 py-3 text-gray-700 font-medium"
                  placeholderTextColor="#ccc"
                />
              </View>
            </View>

            {/* Street Address */}
            <View className="mb-5">
              <Text className="text-gray-400 font-bold mb-2 ml-1">Street Address</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-1">
                <Ionicons name="location-outline" size={20} color="#FF6347" />
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder="123, Galle Road"
                  className="flex-1 ml-3 py-3 text-gray-700 font-medium"
                  placeholderTextColor="#ccc"
                />
              </View>
            </View>

            {/* City */}
            <View className="mb-5">
              <Text className="text-gray-400 font-bold mb-2 ml-1">City</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-1">
                <Ionicons name="business-outline" size={20} color="#FF6347" />
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  placeholder="Colombo"
                  className="flex-1 ml-3 py-3 text-gray-700 font-medium"
                  placeholderTextColor="#ccc"
                />
              </View>
            </View>

            {/* Phone */}
            <View className="mb-5">
              <Text className="text-gray-400 font-bold mb-2 ml-1">Phone Number</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-1">
                <Ionicons name="call-outline" size={20} color="#FF6347" />
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+94 77 123 4567"
                  keyboardType="phone-pad"
                  className="flex-1 ml-3 py-3 text-gray-700 font-medium"
                  placeholderTextColor="#ccc"
                />
              </View>
            </View>


          </View>

          <View className="h-10" />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Save Button */}
      <View className="px-6 py-6 border-t border-gray-100">
        <TouchableOpacity 
          className="bg-orange-500 py-5 rounded-[25px] items-center shadow-lg shadow-orange-300"
          onPress={() => {
            handleSavAddress(); // මෙතනට Save Address function එකක් implement කරන්න
            // router.back()
          }}
        >
          <Text className="text-white text-lg font-black uppercase tracking-widest">Save Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default AddressScreen;