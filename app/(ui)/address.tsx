import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getUserAddress, saveAddress } from '@/services/profileService';
import { useLoader } from '@/hooks/useLoader';

const AddressScreen = () => {
  const router = useRouter();
  const { showLoader, hideLoader, isLoading } = useLoader();

  const [addressType, setAddressType] = useState('Home');
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [addressList, setAddressList] = useState<any[]>([]);

  const fetchUserAddress = async () => {
    try {
      showLoader();
      const userAddress = await getUserAddress();
      setAddressList(userAddress);

      const defaultAddress = userAddress.find((add: any) => add.addressType === 'Home');
      if (defaultAddress) {
        updateInputFields(defaultAddress);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchUserAddress();
  }, []);

  const updateInputFields = (data: any) => {
    setFullName(data?.fullName || "");
    setAddress(data?.address || "");
    setCity(data?.city || "");
    setPhone(data?.phone || "");
  };

  const handleTypeChange = (type: string) => {
    setAddressType(type);
    const found = addressList.find((add: any) => add.addressType === type);
    if (found) {
      updateInputFields(found);
    } else {
      updateInputFields({});
    }
  };

  const handleSaveAddress = async () => {
    if (!fullName || !address || !city || !phone) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      showLoader();
      await saveAddress(fullName, address, city, phone, addressType);
      Alert.alert("Success", "Address Saved Successfully");
      
      
      await fetchUserAddress(); 
    } catch (error) {
      Alert.alert("Error", "Failed to save address");
    } finally {
      hideLoader();
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="bg-gray-100 p-2 rounded-full">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-black ml-4 text-[#141414cc]">Delivery Address</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="px-6">
          
          {/* Map Placeholder */}
          <View className="w-full h-48 bg-gray-100 rounded-[30px] mt-4 overflow-hidden items-center justify-center border border-gray-200">
            <Ionicons name="map-outline" size={40} color="#ccc" />
            <Text className="text-gray-400 mt-2 font-medium">Map View Coming Soon</Text>
          </View>

          {/* Type Selection */}
          <View className="flex-row mt-8 justify-between">
            {['Home', 'Office', 'Other'].map((type) => (
              <TouchableOpacity 
                key={type}
                onPress={() => handleTypeChange(type)}
                className={`flex-1 py-3 mx-1 rounded-2xl items-center border ${
                  addressType === type ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-200'
                }`}
              >
                <Text className={`font-bold ${addressType === type ? 'text-white' : 'text-gray-500'}`}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Input Fields */}
          <View className="mt-8">
            <AddressField label="Full Name" icon="person-outline" value={fullName} onChange={setFullName} placeholder="Enter full name" />
            <AddressField label="Street Address" icon="location-outline" value={address} onChange={setAddress} placeholder="123, Galle Road" />
            <AddressField label="City" icon="business-outline" value={city} onChange={setCity} placeholder="Colombo" />
            <AddressField label="Phone" icon="call-outline" value={phone} onChange={setPhone} placeholder="+94 77 123 4567" keyboardType="phone-pad" />
          </View>

          <View className="h-10" />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Save Button */}
      <View className="px-6 py-6 border-t border-gray-100">
        <TouchableOpacity 
          disabled={isLoading}
          className={`bg-orange-500 py-5 rounded-[25px] items-center shadow-lg ${isLoading ? 'opacity-50' : ''}`}
          onPress={handleSaveAddress}
        >
          <Text className="text-white text-lg font-black uppercase tracking-widest">
            {isLoading ? "Saving..." : "Save Address"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ⌨️ Helper Component for Inputs
const AddressField = ({ label, icon, value, onChange, placeholder, keyboardType = 'default' }: any) => (
  <View className="mb-5">
    <Text className="text-gray-400 font-bold mb-2 ml-1">{label}</Text>
    <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-1">
      <Ionicons name={icon} size={20} color="#FF6347" />
      <TextInput 
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        className="flex-1 ml-3 py-3 text-gray-700 font-medium"
        placeholderTextColor="#ccc"
      />
    </View>
  </View>
);

export default AddressScreen;