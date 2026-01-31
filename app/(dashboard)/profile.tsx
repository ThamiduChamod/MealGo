import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AddressScreen from '@/app/(ui)/address';
import { useState } from 'react';

const ProfileScreen = () => {
  const router = useRouter();
  const PRIMARY_COLOR = '#FF6347'; // Tomato Orange
  const [showAddress, setShowAddress] = useState(false);

  // Profile Menu Items Array
  const menuItems = [
    { id: 1, name: 'My Orders', icon: 'fast-food-outline', color: '#4CAF50' },
    { id: 2, name: 'Delivery Address', icon: 'location-outline', color: '#2196F3' },
    { id: 3, name: 'Payment Methods', icon: 'card-outline', color: '#FF9800' },
    { id: 4, name: 'Promo Codes', icon: 'pricetag-outline', color: '#E91E63' },
    { id: 5, name: 'Settings', icon: 'settings-outline', color: '#607D8B' },
  ];

  return (
    <View className="flex-1 bg-white">
        

      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center">
        <Text className="text-2xl font-black text-[#141414cc]">Profile</Text>
        <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
          <Feather name="edit-3" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6">
        {/* User Info Section */}
        <View className="items-center my-8">
          <View className="relative">
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} 
              className="w-32 h-32 rounded-full border-4 border-gray-50"
            />
            <View className="absolute bottom-0 right-2 bg-[#FF6347] p-2 rounded-full border-4 border-white">
              <Ionicons name="camera" size={18} color="white" />
            </View>
          </View>
          <Text className="text-2xl font-bold mt-4 text-[#141414cc]">Saman Kumara</Text>
          <Text className="text-gray-500 font-medium">saman.kumara@email.com</Text>
        </View>

        {/* Menu Items Loop */}
        <View className="bg-gray-50 rounded-[40px] p-6 mb-10">
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              className="flex-row items-center justify-between py-4 border-b border-gray-100 last:border-0"
              onPress={() => {
                if (item.id === 1) {
                  router.push('/(ui)/myOrders');
                }else if (item.id === 2) {
                  router.push('/(ui)/address');
                }else if(item.id === 3){
                    router.push('/(ui)/paymentMethods')
                }
              }}
            >
                


              <View className="flex-row items-center">
                <View 
                  style={{ backgroundColor: `${item.color}20` }} 
                  className="p-3 rounded-2xl mr-4"
                >
                  <Ionicons name={item.icon as any} size={22} color={item.color} />
                </View>
                <Text className="text-lg font-bold text-gray-700">{item.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity className="flex-row items-center py-4 mt-2">
            <View className="bg-red-50 p-3 rounded-2xl mr-4">
              <Ionicons name="log-out-outline" size={22} color="#F44336" />
            </View>
            <Text className="text-lg font-bold text-red-500">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;