import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View, Text, Dimensions,  } from "react-native";

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 28; // දෙපැත්තෙන් padding අයින් කළ පසු පළල

const AD_DATA = [
  { id: '1', title: '50% OFF', subtitle: 'On your first order!', icon: 'gift', bg: 'bg-black', text: 'text-white' },
  { id: '2', title: 'FREE DRINK', subtitle: 'With every Spicy Burger', icon: 'coffee', bg: 'bg-white', text: 'text-black' },
  { id: '3', title: 'FAST DELIVERY', subtitle: 'Under 20 minutes', icon: 'truck', bg: 'bg-black', text: 'text-white' },
];

const AutoScrollBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Auto-scroll Logic
  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= AD_DATA.length) {
        nextIndex = 0; // අවසානයට ගිය පසු නැවත මුලට
      }
      
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000); // තත්පර 3කට වරක් මාරු වේ

    return () => clearInterval(timer); // Component එක අයින් වන විට timer එක නවත්වන්න
  }, [currentIndex]);

  const renderBanner = ({ item }: { item: typeof AD_DATA[0] }) => (
    <TouchableOpacity 
      className={`${item.bg} rounded-md p-8 mr-4  flex-row items-center border-2 border-black`}
      style={{ width: BANNER_WIDTH, height: 120 }}
    >
      <View className="flex-1"> 
        <Text className={`${item.text} text-2xl font-black`}>{item.title}</Text>
        <Text className={`${item.text === 'text-white' ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>
          {item.subtitle}
        </Text>
      </View>
      <View className={`${item.text === 'text-white' ? 'bg-white/20' : 'bg-black/5'} w-20 h-20 rounded-full items-center justify-center`}>
        <Feather name={item.icon as any} size={35} color={item.text === 'text-white' ? 'white' : 'black'} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mb-6">
      <FlatList
        ref={flatListRef}
        data={AD_DATA}
        renderItem={renderBanner}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        // User අතින් scroll කළොත් index එක update කරන්න
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / BANNER_WIDTH);
          setCurrentIndex(index);
        }}
      />
    </View>
  );
};

export default AutoScrollBanner;