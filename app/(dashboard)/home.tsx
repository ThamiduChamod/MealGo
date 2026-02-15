// import AutoScrollBanner from '@/components/bannerComponent'
import FoodCardMini from '@/components/foodCardComponents'
import { useLoader } from '@/hooks/useLoader'
import { auth } from '@/services/firebase'
import { getAll } from '@/services/homeService'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const home = () => {
  const [activeCat, setActiveCat] = useState(1);
  const [foodData, setFoodData] = useState<any[]>([]);
    const { showLoader, hideLoader, isLoading } = useLoader();
  
  const router = useRouter();
  const user = auth.currentUser;
  
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in, fetching data...");
      loadFoodData(); 
    } else {
      console.log("No user found");
      router.replace("/login");
    }
  });

  const loadFoodData = async () => {
    try {
      showLoader()
      const data = await getAll();
      if (data == null) throw new Error("No user logged in");
      setFoodData(data);
    } catch (err) {
      hideLoader()
      console.error(err);
    }finally {hideLoader()}
  };

  return () => unsubscribe(); // Cleanup the listener
}, []);


  const openOrder = (item: any) => {
    router.push(`/details/${item.id}?id=${item.id}`);
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
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <StatusBar barStyle="dark-content" />
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      style={{ flex: 1 }}
      resizeMode="repeat"
      imageStyle={{ opacity: 0.1 }}
    >
      {/* 💡 මෙතන තිබුණු ScrollView එක අයින් කළා */}
      
      <FlatList
        // 1. මේ ලිස්ට් එකේ උඩට එන්න ඕන දේවල් මෙතනට දානවා (Banner, Category ScrollView)
        ListHeaderComponent={(
          <View style={{ padding: 16, paddingTop: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
              Hello, {user?.displayName || "User"}!
            </Text>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>What do you want to eat?</Text>
              <TouchableOpacity onPress={() => router.push("/cart")}>
                <Ionicons name="cart-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Banner එක */}
            {/* <AutoScrollBanner /> */}

            {/* Horizontal ScrollView එක (මේක FlatList එකක් ඇතුළේ පාවිච්චි කරන්න පුළුවන් මොකද මේක Horizontal නිසා) */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 15 }}
            >
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setActiveCat(category.id)}
                  className={`flex-row items-center mr-4 px-6 py-3 rounded-full ${
                    activeCat === category.id ? "bg-[#FF6347]" : "bg-black"
                  }`}
                >
                  <Ionicons name={category.icon as any} size={18} color="white" />
                  <Text className="ml-2 text-white font-bold">{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        // 2. ප්‍රධාන කෑම ලිස්ට් එක
        data={foodData.filter((item) => activeCat === 1 ? true : item.cat === activeCat)}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={{ width: '48%', marginBottom: 16 }}>
            <FoodCardMini item={item} onOpen={() => openOrder(item)} />
          </View>
        )}
        
        // පල්ලෙහායින් ඉඩ තියන්න
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
      
    </ImageBackground>
  </SafeAreaView>
);
}

export default home