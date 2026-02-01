import AutoScrollBanner from '@/components/bannerComponent'
import FoodCardMini from '@/components/foodCardComponents'
import { FOOD_DATA } from '@/constants/data'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const home = () => {
  const [activeCat, setActiveCat] = useState(1);
  const router = useRouter();

  const openOrder = (item: any) => {
    router.push(`/details/${item.id}`);
  };


  console.log(activeCat);

  const CATEGORIES = [
    { id: 1, name: "All", icon: "grid-outline" },
    { id: 2, name: "Burgers", icon: "fast-food-outline" },
    { id: 3, name: "Buns", icon: "aperture-outline" },
    { id: 4, name: "Drinks", icon: "wine-outline" },
    { id: 5, name: "Snacks", icon: "restaurant-outline" },
  ];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        style={{ flex: 1 }}
        resizeMode="repeat"
        imageStyle={{ opacity: 0.25 }}
      >
      <StatusBar />
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        />

        <View style={{ flex: 1, padding: 16, paddingTop: 32 }}>
          {/* header */}
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
            Hello, User!
          </Text>

          <AutoScrollBanner />

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 8 }}
            >
              {/* Categories will go here */}
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id} 
                  onPress={() => setActiveCat(category.id)}

                  className='flex-row items-center mr-4 px-6 py-4 rounded-[25px] bg-black'
                >
                  <Ionicons
                    name={category.icon as any}
                    size={20}
                    color={activeCat === category.id ? "#FF6347" :"white"}
                  />
                  <Text
                    className={`ml-2 ${
                      activeCat === category.id ? "text-[#FF6347]" : "text-white"
                    }`}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <FlatList
            data={
              FOOD_DATA.filter((item) =>
                activeCat === 1 ? true : item.cat === activeCat
              )
            }
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            renderItem={({ item }) => (
              <FoodCardMini item={item} onOpen={() => openOrder(item)} />
            )}
          />


          </View>
          
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default home