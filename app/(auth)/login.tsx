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
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useLoader } from "@/hooks/useLoader";
import { login } from "@/services/authService";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { showLoader, hideLoader, isLoading} =useLoader()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    console.log("Logging in with:", email);
    showLoader()
    try {
      await login(email, password)
      router.replace("/home");
    } catch (error) {
      Alert.alert("Login Failed", `Invalid email or password \n${error}`);
      console.error("Login error:", error);
    }finally{
      hideLoader()
    }

    
  };

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
          <StatusBar style="dark" />

          
          <View className="absolute inset-0 bg-white/70" />

          <View className="flex-1 justify-center px-8 py-10">
            
            <View className="items-center ">
              <Image
                source={require("@/assets/images/MealGo_LOGO-BGRemove.png")}
                className="border-2 border-black rounded-full w-32 h-32 mb-6"
                resizeMode="contain"
              />
            </View>

            <Text className="text-3xl font-bold text-center text-black mb-8 tracking-wider">
              Login to Your Account
            </Text>

            <View className="space-y-5">
              <View className="flex-row items-center border-2 border-black rounded-xl px-4 py-3 bg-white shadow-sm mb-5">
                <Feather name="mail" size={20} color="black" />
                <TextInput
                  className="flex-1 ml-3 text-base text-black font-medium"
                  placeholder="Email Address"
                  placeholderTextColor="#666"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="flex-row items-center border-2 border-black rounded-xl px-4 py-3 bg-white shadow-sm">
                <Feather name="lock" size={20} color="black" />
                <TextInput
                  className="flex-1 ml-3 text-base text-black font-medium"
                  placeholder="Password"
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              className="mt-8 bg-black rounded-xl py-4 shadow-lg active:bg-gray-800"
              onPress={handleLogin}
            >
              <Text className="text-white text-center text-lg font-bold tracking-wide">
                Login
              </Text>
            </TouchableOpacity>

            {/* --- FORGOT PASSWORD --- */}
            <TouchableOpacity className="mt-4 items-center">
              <Text className="text-gray-600 font-medium">Forgot Password?</Text>
            </TouchableOpacity>

            {/* --- DIVIDER --- */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="mx-4 text-gray-500 text-sm">
                or continue with
              </Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            {/* --- SOCIAL ICONS --- */}
            <View className="flex-row justify-center space-x-10 ">
              <TouchableOpacity className="border border-gray-200 rounded-full p-4 bg-white shadow-sm m-2">
                <FontAwesome5 name="google" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity className="border border-gray-200 rounded-full p-4 bg-white shadow-sm m-2">
                <FontAwesome5 name="apple" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* --- SIGN UP LINK --- */}
            <View className="flex-row justify-center mt-10">
              <Text className="text-gray-600">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text className="text-black font-bold underline">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;