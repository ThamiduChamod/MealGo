import React, { useState } from 'react';
import { View, Text, FlatList, StatusBar, ImageBackground, StyleSheet  } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import FoodCardMini from '@/components/foodCardComponents';
import AutoScrollBanner from '@/components/bannerComponent';
import { useRouter } from 'expo-router';
import { FOOD_DATA } from '@/constants/data';

export default function Home() {
  const router = useRouter();
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  
  const openOrder = (item: any) => {
    console.log('Opening order for item:', item.name);
    router.push(`/details/${item.id}?id=${item.id}`);
  };



 

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
        <StatusBar  />

        {/* --- OVERLAY --- */}
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.7)' }} />

        {/* --- MAIN CONTENT --- */}
        <View style={{ flex: 1, padding: 16, paddingTop: 32 }}>
          {/* HEADER */}
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Hello, User!</Text>

          {/* SEARCH BAR (You can convert to a separate component) */}
          {/* ... */}

          {/* --- FLATLIST GRID + Banner --- */}
          <FlatList
            data={FOOD_DATA}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 120 }}
            renderItem={({ item }) => <FoodCardMini item={item} onOpen={() => openOrder(item)} />}
            
             ListHeaderComponent={
              <>
                <AutoScrollBanner />
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 10 }}>Popular Foods</Text>
              </>
            }
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
