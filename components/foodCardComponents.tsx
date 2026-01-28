import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth / 2) - 24; // පේළියකට දෙකක් පෙන්වීමට පළල ගණනය කිරීම

const FoodCardMini = ({ item, onAdd }: any) => {
  return (
    <View 
      style={{ width: cardWidth }} 
      className="bg-white border-2 border-black rounded-[30px] p-3 mb-10 mx-2 shadow-sm relative mt-12"
    >
      {/* Floating Image - ප්‍රමාණය අඩු කර ඇත */}
      <View className="items-center -mt-16 mb-2">
        <Image
          source={item.image}
          className="w-32 h-24" 
          resizeMode="contain"
        />
      </View>

      {/* Details */}
      <View className="mt-1">
        <Text className="text-lg font-black text-black leading-5" numberOfLines={1}>
          {item.name}
        </Text>
        
        <View className="flex-row items-center mt-1">
          <Ionicons name="star" size={12} color="#FFC107" />
          <Text className="text-gray-500 text-[10px] font-bold ml-1">{item.rating}</Text>
        </View>
      </View>

      {/* Price and Add Button */}
      <View className="flex-row justify-between items-center mt-4">
        <View>
          <Text className="text-[10px] font-black text-black">LKR {item.price}</Text>
        </View>

        <TouchableOpacity 
          className="bg-black w-8 h-8 rounded-lg items-center justify-center"
          onPress={onAdd}
        >
          <Feather name="plus" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodCardMini