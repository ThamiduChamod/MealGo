import React from 'react';
import { Image, Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate
} from "react-native-reanimated";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const AnimatedImage = Animated.Image as any;
const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 20; // ටිකක් පළල වැඩි කළා Gap එක ලස්සන වෙන්න
const IMAGE_SIZE = 150;

const FoodCardMini = ({ item, onOpen }: any) => {

  const rotateX = useSharedValue(5);
  const rotateY = useSharedValue(-10);
  const scale = useSharedValue(1);

  console.log(item.image);

  // GestureDetector එක හරියටම වැඩ කරන්න නම් Pan එක use කරන විදිහ
  const gesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.2, { damping: 10, stiffness: 100 });
    })
    .onUpdate((e) => {
      // Finger එක move කරන පැත්තට image එක rotate වීම
      rotateY.value = interpolate(e.translationX, [-100, 100], [-30, 30]);
      rotateX.value = interpolate(e.translationY, [-100, 100], [30, -30]);
    })
    .onFinalize(() => {
      // අත ඇරියම ආපහු මුල් තිබුණ 3D position එකට එනවා
      scale.value = withSpring(1);
      rotateX.value = withSpring(5);
      rotateY.value = withSpring(-10);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { scale: scale.value },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  return (
    <View style={[styles.cardContainer, { width: cardWidth }]} className="bg-white shadow-lg mx-2 mb-5">
      
      {/* 3D Image Section */}
      <GestureDetector gesture={gesture}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/cardBackground.png")}
            style={styles.brushImage}
            resizeMode="contain"
          />
          <Animated.View style={animatedStyle}>
            <AnimatedImage
              sharedTransitionTag={`image-${item.id}`} // 👈 මේකෙන් තමයි detail screen එකට පින්තූරය අරන් යන්නේ
              source={{ uri: item.image }}
              style={styles.foodImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </GestureDetector>

      {/* Details - Clickable Area */}
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={() => onOpen && onOpen(item)}
        className="mt-4 px-3 pb-4"
      >
        <Text className="font-black text-black text-base" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-gray-400 font-bold mt-1 text-xs">
          LKR {item.price}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    marginTop: 50,
    position: 'relative',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginTop: -40,
  },
  brushImage: {
    width: 145,
    height: 145,
    position: 'absolute',
    opacity: 0.7,
  },
  foodImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    zIndex: 20,
  },
});

export default FoodCardMini;