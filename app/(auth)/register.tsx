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

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    
    console.log("Registering user:", name, email);
    // මෙතැනදී Firebase createUserWithEmailAndPassword function එක පාවිච්චි කරන්න පුළුවන්
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
        imageStyle={{ opacity: 0.15 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBar style="dark" />

          <View className="absolute inset-0 bg-white/60" />

          <View className="flex-1 justify-center px-8 py-12">
            
            {/* --- LOGO SECTION --- */}
            <View className="items-center mb-6">
              <Image
                source={require("@/assets/images/MealGo_LOGO-BGRemove.png")}
                className="border-2 border-black rounded-full w-32 h-32 "
                resizeMode="contain"
              />
            </View>

            {/* --- HEADING --- */}
            <Text className="text-3xl font-bold text-center text-black mb-2 tracking-wider">
              Create Account
            </Text>
            <Text className="text-gray-500 text-center mb-8 font-medium">
              Join MealGo to start ordering!
            </Text>

            {/* --- INPUT FIELDS --- */}
            <View className="space-y-4">
              
              {/* Full Name Input */}
              <View className=" mb-2 flex-row items-center border-2 border-black rounded-xl px-4 py-3 bg-white shadow-sm">
                <Feather name="user" size={20} color="black" />
                <TextInput
                  className="flex-1 ml-3 text-base text-black font-medium "
                  placeholder="Full Name"
                  placeholderTextColor="#666"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Email Input */}
              <View className="mb-2 flex-row items-center border-2 border-black rounded-xl px-4 py-3 bg-white shadow-sm">
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

              {/* Password Input */}
              <View className=" mb-2 flex-row items-center border-2 border-black rounded-xl px-4 py-3 bg-white shadow-sm">
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

              {/* Confirm Password Input */}
              <View className="flex-row items-center border-2 border-black rounded-xl px-4 py-3 bg-white shadow-sm">
                <Feather name="check-circle" size={20} color="black" />
                <TextInput
                  className="flex-1 ml-3 text-base text-black font-medium"
                  placeholder="Confirm Password"
                  placeholderTextColor="#666"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                />
              </View>
            </View>

            {/* --- REGISTER BUTTON --- */}
            <TouchableOpacity
              className="mt-8 bg-black rounded-xl py-4 shadow-lg active:bg-gray-800"
              onPress={handleRegister}
            >
              <Text className="text-white text-center text-lg font-bold tracking-wide">
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* --- DIVIDER --- */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="mx-4 text-gray-500 text-sm">or sign up with</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            {/* --- SOCIAL ICONS --- */}
            <View className="flex-row justify-center space-x-6">
              <TouchableOpacity className="mr-2 border border-gray-200 rounded-full p-4 bg-white shadow-sm">
                <FontAwesome5 name="google" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity className="ml-2 border border-gray-200 rounded-full p-4 bg-white shadow-sm">
                <FontAwesome5 name="apple" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* --- LOGIN LINK --- */}
            <View className="flex-row justify-center mt-2">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-black font-bold underline">Login</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Register;