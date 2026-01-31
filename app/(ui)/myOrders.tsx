import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Dummy Order Data
const ORDERS = [
  {
    id: 'ORD-5521',
    date: 'Today, 12:40 PM',
    status: 'Processing',
    items: 'Classic Beef Burger x 1, Coke x 1',
    total: '1,550',
    image: require('@/assets/images/b2.png'),
  },
  {
    id: 'ORD-4210',
    date: 'Yesterday, 08:20 PM',
    status: 'Delivered',
    items: 'Cheesy Burger x 2',
    total: '2,400',
    image: require('@/assets/images/b2.png'),
  },
];

const MyOrdersScreen = () => {
  return (
    <View className="flex-1 bg-white">
        <View className="flex-row items-center px-6 py-4">
            <TouchableOpacity onPress={() => router.back()} className="bg-gray-100 p-2 rounded-full">
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-black ml-4 text-[#141414cc]">My Orders</Text>
        </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6 py-4">
        {ORDERS.map((order) => (
          <View key={order.id} className="bg-gray-50 rounded-[30px] p-5 mb-5 border border-gray-100 shadow-sm">
            
            {/* Order Header */}
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-gray-400 font-bold text-xs uppercase tracking-tighter">Order ID</Text>
                <Text className="text-[#141414cc] font-black text-lg">#{order.id}</Text>
              </View>
              <View className={`px-4 py-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-100' : 'bg-orange-100'}`}>
                <Text className={`font-bold text-xs ${order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>
                  {order.status}
                </Text>
              </View>
            </View>

            {/* Order Content */}
            <View className="flex-row items-center border-t border-gray-100 pt-4">
              <Image source={order.image} className="w-16 h-16 rounded-2xl bg-white" resizeMode="contain" />
              <View className="ml-4 flex-1">
                <Text className="text-gray-500 font-medium text-sm mb-1">{order.date}</Text>
                <Text className="text-[#141414cc] font-bold text-base" numberOfLines={1}>{order.items}</Text>
                <Text className="text-orange-500 font-black text-lg mt-1">LKR {order.total}</Text>
              </View>
            </View>

            {/* Reorder Button */}
            <TouchableOpacity className="mt-4 bg-white border border-gray-200 py-3 rounded-2xl items-center">
              <Text className="text-[#141414cc] font-bold">Reorder Item</Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyOrdersScreen;