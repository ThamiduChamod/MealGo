import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { Ionicons, Feather } from '@expo/vector-icons';
import { FOOD_DATA } from '@/constants/data';
import { addToCart, findById } from '@/services/itemService';
import { auth } from '@/services/firebase';
import { useLoader } from '@/hooks/useLoader';

const AnimatedImage = Animated.Image as any;

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { showLoader, hideLoader, isLoading} =useLoader()

  const router = useRouter()

  useEffect(() => {
    if (id) {
      findItem();
    }
  }, [id]); // id එක වෙනස් වුණොත් විතරක් run වෙයි

  const findItem = async () => {
    try {
      showLoader
      const item = await findById(id as string);
      setSelectedItem(item);
    } catch (error) {
      hideLoader
      console.error("Error fetching item:", error);
    } finally {
      hideLoader
    }
  };
  if (!selectedItem) {
    return <Text>Item not found!</Text>;
  }

  const handelCart = async () => {
    try {
      await addToCart(selectedItem.id)
    } catch (error) {
      
      
    }
  }
  

  return (
    <View className="flex-1 bg-transparent">
      {/* Header Section */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-transparent">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="bg-gray-100 p-3 rounded-2xl"
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-gray-100 p-3 rounded-2xl">
          <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
      </View>
      

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* ✅ Image Section with Background Brush */}
        <View className="items-center justify-center h-80 relative">
          <Image 
            source={require("../../assets/images/cardBackground.png")} 
            className="w-72 h-73 absolute opacity-30"
            resizeMode="contain"
          />
          <AnimatedImage
            sharedTransitionTag={`image-${id}`}
            source= {{uri: selectedItem.image}}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </View>

        {/* Info Section */}
        <View className="px-8 pt-6">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <View className='bg-[#000000] rounded-xl px-full py-1 mb-2 flex-row w-full items-center p-2 h-30 '>
                <Text className="text-3xl text-white  flex-row justify-end font-black">LKR {selectedItem.price}</Text>
              </View>
              <Text className="text-3xl mt-5 font-black text-black tracking-tight">{selectedItem.name}</Text>
              <View className="flex-row items-center justify-start mt-2">
                <View className="flex-row items-center justify-end bg-yellow-400/20 px-3 py-1 rounded-full">
                  <Ionicons name="star" size={14} color="#EAB308" />
                  <Text className="ml-1 font-bold text-yellow-700 text-xs">{selectedItem.rating}</Text>
                </View>
                <Text className="text-gray-400 ml-3 text-xs font-bold">Free Delivery</Text>
              </View>   
            </View>
          </View>
          <View className='py-6 bg-gray-100 rounded-2xl p-4 mt-6'>
            <Text className='text-3xl  font-medium text-[#141414cc]' > Description </Text>
            <Text className="text-gray-500 mt-6 leading-6 text-base font-medium">{selectedItem.description}</Text>
          </View>
          
          <View className='mb-20 mt-6 relative px-4 py-6 bg-gray-100 rounded-2xl'>
            {/* 1. මේක තමයි පල්ලෙහාට යන Background Image එක */}
            <View className="absolute inset-0 right-0 bottom-0  opacity-10">
              <Image 
                source={selectedItem.image} 
                className="w-69 h-64 opacity-80"
                resizeMode="contain"
                // style={{ tintColor: '#8B4513' }} 
              />
            </View>

            {/* 2. පින්තූරය උඩින් පේන Content එක */}
            <View className="z-10">
              <Text className='text-3xl font-medium text-[#141414cc] '>Ingredients</Text>
              
              {selectedItem.ingredients.map((ingredient:any) => (
                <View key={ingredient.id} className="flex-row items-center mt-4 ml-4">
                  <View className="h-2 w-2 rounded-full bg-[#141414cc] mr-4" />
                  <Text className="text-gray-500 font-bold uppercase tracking-wider">
                    {ingredient.name}
                  </Text>
                </View>
              ))}
            </View>

          </View>
        </View>


          

          
      </ScrollView>

      {/* ✅ Footer Buttons Section */}
      <View className="flex-row px-6 pt-4 pb-10 bg-white border-t border-gray-100 items-center">
        <TouchableOpacity 
          className="bg-gray-100 h-16 w-16 rounded-2xl items-center justify-center"
          onPress={handelCart}
        >
          <Feather name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-1 bg-black h-16 ml-4 rounded-2xl items-center justify-center shadow-lg shadow-black"
        >
          <Text className="text-white font-black text-lg">Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;