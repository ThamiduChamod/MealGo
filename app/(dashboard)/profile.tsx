import { View, Text, Image, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AddressScreen from '@/app/(ui)/address';
import { useEffect, useState } from 'react';
import { auth } from '@/services/firebase';
import * as ImagePicker from 'expo-image-picker';
import { logout, updateName } from '@/services/authService';
import { useLoader } from '@/hooks/useLoader';
import { getProfilePicture, uploadProfilePicture } from '@/services/profileService';

const ProfileScreen = () => {
  const router = useRouter();
  const PRIMARY_COLOR = '#FF6347'; // Tomato Orange
  const [showAddress, setShowAddress] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { showLoader, hideLoader, isLoading} =useLoader()
  
  
  const user = auth.currentUser
  if(!user){
    router.push('/(auth)/login')
  }
  const [newName, setNewName] = useState(user?.displayName || "");
  console.log("user", user?.displayName, user?.email)

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const profileImage = await getProfilePicture();
        setProfilePicture(profileImage || null);
      } catch (error) {
        console.error("Failed to fetch profile picture:", error);
      }
    };
    fetchProfilePicture();
  }, []);

  const saveProfile = async () => {
    console.log("Save Profile")

    try {
      showLoader()
      if(newName.trim() != user?.displayName){
        updateName(newName.trim())
        Alert.alert("Success", "Profile Name Updated Successfully");
        
      }
    
      if(profilePicture === null){
        console.log("No profile picture selected, skipping update.")
        return
      }
      const result = await uploadProfilePicture(profilePicture)
      if(result){
        console.log("Profile picture updated successfully.")
        Alert.alert("Success", "Profile Updated Successfully");
      }
      
      Alert.alert("Error", "Profile Updated Successfully but failed to update profile picture. Please try again.");

    } catch (error) {
      hideLoader()
      Alert.alert("Error", "Failed to update profile and Profile Name. Please try again.");
      console.error("Profile update error:", error);
    }finally{
      hideLoader()
    }

    

  }

  const pickImage = async () => {
  // 1. Permission ඉල්ලන්න (Gallery සඳහා)
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'ගැලරියට යන්න අවසර ඕනේ මචං!');
    return;
  }

  // 2. Options පෙන්වන්න (Camera or Gallery)
  Alert.alert(
  'Profile Photo',
  'How would you like to select your picture?',
  [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Take Photo',
      onPress: openCamera,
    },
    {
      text: 'Choose from Gallery',
      onPress: openGallery,
    },
    
  ],
  { cancelable: true } 
);
  };
  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // කලින් මේක ImagePicker.MediaTypeOptions.Images
      allowsEditing: true, // කොටු කරලා කපාගන්න (Crop) දෙන්න
      aspect: [1, 1], // හතරැස් වෙන්න
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'කැමරාවට අවසර ඕනේ මචං!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  // Profile Menu Items Array
  const menuItems = [
    { id: 1, name: 'My Orders', icon: 'fast-food-outline', color: '#4CAF50' },
    { id: 2, name: 'Delivery Address', icon: 'location-outline', color: '#2196F3' },
    { id: 3, name: 'Payment Methods', icon: 'card-outline', color: '#FF9800' },
    { id: 4, name: 'Promo Codes', icon: 'pricetag-outline', color: '#E91E63' },
    { id: 5, name: 'Settings', icon: 'settings-outline', color: '#607D8B' },
  ];

  return (
    <View className="flex-1 bg-white">
        

      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center">
        <Text className="text-2xl font-black text-[#141414cc]">Profile</Text>
        <TouchableOpacity className="bg-gray-100 p-2 rounded-full"
          onPress={() => {
            if(editProfile){
              saveProfile()
              setEditProfile(false)
            }else{
              setEditProfile(true)
            }
            
          }}
        >
          {editProfile ? <Text className="text-lg text-black mb-1">save</Text> : <Feather name="edit-3" size={20} color="black" />}
          
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6">
        {/* User Info Section */}
        <View className="items-center my-8">
          <View className="relative">
            <Image 
              source={{ uri: profilePicture || 'https://res.cloudinary.com/dhg6pf96x/image/upload/v1770986708/ec241b8218d6fa02be5e76dea9d0e3ce_hrnjsg.jpg' }} 
              className="w-32 h-32 rounded-full border-4 border-gray-50"
            />
            <View className="absolute bottom-0 right-2 bg-[#FF6347] p-2 rounded-full border-4 border-white">
              <TouchableOpacity
                disabled={!editProfile}
                onPress={() => {
                  pickImage()
                } }
              >
                <Ionicons name="camera" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            editable={editProfile}
            value={newName}
            className="text-2xl font-bold mt-4 text-[#141414cc]" 
            onChangeText={setNewName}
          />
            
            
          <Text className="text-gray-500 font-medium">{user?.email}</Text>
        </View>

        {/* Menu Items Loop */}
        <View className="bg-gray-50 rounded-[40px] p-6 mb-10">
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              className="flex-row items-center justify-between py-4 border-b border-gray-100 last:border-0"
              onPress={() => {
                if (item.id === 1) {
                  router.push('/(ui)/myOrders');
                }else if (item.id === 2) {
                  router.push('/(ui)/address');
                }else if(item.id === 3){
                    router.push('/(ui)/paymentMethods')
                }
              }}
            >
                


              <View className="flex-row items-center">
                <View 
                  style={{ backgroundColor: `${item.color}20` }} 
                  className="p-3 rounded-2xl mr-4"
                >
                  <Ionicons name={item.icon as any} size={22} color={item.color} />
                </View>
                <Text className="text-lg font-bold text-gray-700">{item.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity className="flex-row items-center py-4 mt-2"
            onPress={() =>{
              logout
              router.push('/(auth)/login')
            }}
          >
            <View className="bg-red-50 p-3 rounded-2xl mr-4">
              <Ionicons name="log-out-outline" size={22} color="#F44336" />
            </View>
            <Text className="text-lg font-bold text-red-500">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;


