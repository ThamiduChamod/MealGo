import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";

const CartItem = ({ item, onUpdate }: { item: any, onUpdate: (val: number) => void }) => {
 
  const PRIMARY_COLOR = '#FF6347'; // ඔයාගේ පාට මෙතනට දාන්න
  console.log(item.image);

  const handleIncrease = () => {
    onUpdate(item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdate(item.quantity - 1);
    }
  };

  return (
    <View className="flex-row items-center bg-gray-50 rounded-3xl p-4 mb-4 shadow-sm border border-gray-100">
      {/* පින්තූරය */}
      <Image source={{ uri: item.image }} className="w-20 h-20 rounded-2xl" resizeMode="cover" />

      {/* විස්තර */}
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold text-[#141414cc]">{item.name}</Text>
        <Text className="text-orange-500 font-black mt-1">LKR {item.price * item.quantity}</Text>
      </View>

      {/* Quantity Controls (ඔයා ඉල්ලපු කොටස) */}
      <View className="flex-row items-center bg-white rounded-2xl p-1 border border-gray-100 shadow-inner">
        <TouchableOpacity 
          className="bg-gray-100 p-2 rounded-xl"
          onPress={handleDecrease}
        >
          <Ionicons name="remove" size={18} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        
        <Text className="mx-4 text-lg font-black text-[#141414cc]">{item.quantity}</Text>
        
        <TouchableOpacity 
          className="bg-gray-100 p-2 rounded-xl"
          onPress={handleIncrease}
        >
          <Ionicons name="add" size={18} color={PRIMARY_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;