import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View, Text, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get('window');
// බැනර් එකේ මුළු පළල (Screen width එකම පාවිච්චි කරනවා Snap වෙන්න ලේසි වෙන්න)
const BANNER_WIDTH = width; 

const AD_DATA = [
  { id: '1', title: '50% OFF', subtitle: 'On your first order!', icon: 'gift', bg: 'bg-[#FF6347]' },
  { id: '2', title: 'FREE DRINK', subtitle: 'With every Spicy Burger', icon: 'coffee', bg: 'bg-[#FFD700]' },
  { id: '3', title: 'FAST DELIVERY', subtitle: 'Under 20 minutes', icon: 'truck', bg: 'bg-[#0000]' },
];

const AutoScrollBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Auto-scroll Logic
  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = (currentIndex + 1) % AD_DATA.length;
      
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const renderBanner = ({ item }: { item: typeof AD_DATA[0] }) => (
    <View style={{ width: BANNER_WIDTH }} className="items-center justify-center px-5">
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ width: '100%', height: 140 }}
        className={`${item.bg} rounded-[30px] p-6 flex-row items-center shadow-xl shadow-gray-300`}
      >
        <View className="flex-1 justify-center">
          <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-1">
            <Text className="text-white text-[10px] font-black uppercase tracking-widest">Limited Offer</Text>
          </View>
          <Text className="text-white text-3xl font-black italic uppercase">{item.title}</Text>
          <Text className="text-white/80 text-sm font-medium">{item.subtitle}</Text>
        </View>

        <View className="bg-white/30 w-20 h-20 rounded-full items-center justify-center border-4 border-white/10">
          <Feather name={item.icon as any} size={40} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="mb-6 mt-4">
      <Animated.FlatList
        ref={flatListRef}
        data={AD_DATA}
        renderItem={renderBanner}
        horizontal
        // pagingEnabled වෙනුවට snapToInterval පාවිච්චි කරනවා හරියටම Center වෙන්න
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / BANNER_WIDTH);
          setCurrentIndex(index);
        }}
        // Index එක මාරු වෙද්දී එන error එක වළක්වන්න
        getItemLayout={(data, index) => ({
          length: BANNER_WIDTH,
          offset: BANNER_WIDTH * index,
          index,
        })}
      />

      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-4">
        {AD_DATA.map((_, i) => {
          const inputRange = [(i - 1) * BANNER_WIDTH, i * BANNER_WIDTH, (i + 1) * BANNER_WIDTH];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={{ width: dotWidth, opacity }}
              className="h-2 rounded-full bg-orange-500 mx-1"
            />
          );
        })}
      </View>
    </View>
  );
};

export default AutoScrollBanner;