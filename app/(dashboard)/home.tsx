import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ImageBackground,
  FlatList, 
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import AutoScrollBanner from '@/components/bannerComponent';
import FoodCardMini from '@/components/foodCardComponents';

export default function Home() {
  const FOOD_DATA = [
    {
      id: '1',
      name: 'Classic Beef',
      price: '1,250',
      description: 'Juicy beef patty with melted cheese and secret sauce.',
      rating: '4.8 (120+)',
      image: require('@/assets/images/b1.png'),
    },
    {
      id: '2',
      name: 'Spicy Zinger',
      price: '1,100',
      description: 'Extra crispy chicken with spicy mayo and lettuce.',
      rating: '4.5 (90+)',
      image: require('@/assets/images/b1.png'),
    },
  ];
  return (
    <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ImageBackground
            source={require("@/assets/images/background.jpg")} 
            className="flex-1"
            resizeMode="repeat" 
            imageStyle={{ opacity: 0.25 }} 
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <StatusBar style="light" backgroundColor="black" />
    
              
              <View className="absolute inset-0 bg-white/70" />

              <View className="p-4 pt-8">
              
                {/* --- HEADER --- */}
                <View className="flex-row justify-between items-center mb-6">
                  <View>
                      <Text className="text-2xl font-bold text-black">Hello, User!</Text>
                  </View>
                  <View className="flex-row items-center space-x-4">
                    <TouchableOpacity className="ml-4 border border-black rounded-full p-1">
                      <Feather name="user" size={22} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* --- SEARCH BAR --- */}
                <View className="flex-row items-center border-2 border-black rounded-2xl px-4 py-0 bg-white mb-6 fixed">
                  <Feather name="search" size={20} color="black" />
                  <TextInput
                    className="flex-1 ml-3 text-base font-medium"
                    placeholder="Search for food..."
                    placeholderTextColor="#999"
                  />
                </View>

                {/* --- CONTENT --- */}
                <View className="flex-1 w-full">

                  {/* --- PROMO/AD SECTION --- */}
                  <AutoScrollBanner />

                  {/* --- FOOD CARD SECTION --- */}
                  <View className="mb-10 w-fit">
                    <Text className="text-xl font-bold text-black mb-4">Popular Foods</Text>
                    {/* FoodCard Component එක මෙතන ඇතුලත් කරන්න */}
                    <View className="flex-1 px-2 pt-10">
                      <FlatList
                        data={FOOD_DATA}
                        renderItem={({ item }) => <FoodCardMini item={item} onAdd={() => {}} />}
                        keyExtractor={(item) => item.id}
                        numColumns={2} // මේකෙන් තමයි පේළියකට දෙකක් පෙන්වන්නේ
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </KeyboardAvoidingView>
  )
}
