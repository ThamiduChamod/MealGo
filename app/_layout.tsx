import { View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LoaderProvider } from "@/context/LoaderContext";
import { AuthProvider } from "@/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LoaderProvider>
        <AuthProvider>
          <View style={{ marginTop: insets.top, flex: 1 }}>
            <Slot />
          </View>
        </AuthProvider>
      </LoaderProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
