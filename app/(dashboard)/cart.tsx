import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// 💡 මෙතනට ඔයාගේ Theme එකේ පාටවල් දාගන්න
const PRIMARY_COLOR = '#FF6347'; // උදා: Tomato Red / Orange
const TEXT_COLOR = '#141414cc'; // Dark text color

// Dummy Cart Data (පස්සේ ඔයාට මේක Redux හෝ Context API එකකින් manage කරන්න පුළුවන්)
const DUMMY_CART_ITEMS = [
  {
    id: '1',
    name: 'Classic Beef Burger',
    price: 1250,
    quantity: 1,
    image: require('@/assets/images/b2.png'), // ඔයාගේ image path එක
  },
  {
    id: '2',
    name: 'Spicy Zinger Burger',
    price: 1100,
    quantity: 2,
    image: require('@/assets/images/b2.png'), // ඔයාගේ image path එක
  },
  {
    id: '3',
    name: 'Cheesy Fries',
    price: 450,
    quantity: 1,
    image: require('@/assets/images/f1.png'), // තව image path එකක්
  },
];

const CartScreen = () => {
  const router = useRouter();

  // මුළු Cart එකේම එකතුව ගණනය කිරීම
  const subtotal = DUMMY_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 250; // උදාහරණයක්
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={TEXT_COLOR} />
        </TouchableOpacity>
        <Text style={{ color: TEXT_COLOR }} className="text-2xl font-bold">Your Cart</Text>
        <View className="w-7" /> {/* Spacer for centering title */}
      </View>

      {/* Cart Items List */}
      {DUMMY_CART_ITEMS.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="cart-outline" size={80} color="gray" />
          <Text className="text-gray-500 text-lg mt-4">Your cart is empty!</Text>
        </View>
      ) : (
        <ScrollView className="flex-1 px-4 py-6">
          {DUMMY_CART_ITEMS.map((item) => (
            <View 
              key={item.id} 
              className="flex-row items-center bg-gray-50 rounded-2xl p-4 mb-4 shadow-sm"
            >
              {/* Item Image */}
              <Image source={item.image} className="w-20 h-20 rounded-xl mr-4" resizeMode="cover" />

              {/* Item Details */}
              <View className="flex-1">
                <Text style={{ color: TEXT_COLOR }} className="text-lg font-bold">{item.name}</Text>
                <Text className="text-gray-600 text-base mt-1">LKR {item.price.toLocaleString()}</Text>
              </View>

              {/* Quantity Controls */}
              <View className="flex-row items-center bg-white rounded-full p-1 shadow-sm">
                <TouchableOpacity className="p-1">
                  <Ionicons name="remove" size={20} color={PRIMARY_COLOR} />
                </TouchableOpacity>
                <Text style={{ color: TEXT_COLOR }} className="mx-3 text-base font-bold">{item.quantity}</Text>
                <TouchableOpacity className="p-1">
                  <Ionicons name="add" size={20} color={PRIMARY_COLOR} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Cart Summary & Checkout */}
      {DUMMY_CART_ITEMS.length > 0 && (
        <View className="bg-white p-6 shadow-lg rounded-t-3xl border-t border-gray-100">
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600 text-base">Subtotal</Text>
            <Text style={{ color: TEXT_COLOR }} className="text-base font-bold">LKR {subtotal.toLocaleString()}</Text>
          </View>
          <View className="flex-row justify-between mb-4">
            <Text className="text-gray-600 text-base">Delivery</Text>
            <Text style={{ color: TEXT_COLOR }} className="text-base font-bold">LKR {deliveryFee.toLocaleString()}</Text>
          </View>
          <View className="flex-row justify-between items-center border-t border-gray-200 pt-4">
            <Text style={{ color: TEXT_COLOR }} className="text-xl font-extrabold">Total</Text>
            <Text style={{ color: PRIMARY_COLOR }} className="text-2xl font-extrabold">LKR {total.toLocaleString()}</Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity 
            style={{ backgroundColor: PRIMARY_COLOR }} 
            className="flex-row items-center justify-center rounded-full py-4 mt-6 shadow-md"
            onPress={() => { /* Checkout logic here */ }}
          >
            <Ionicons name="lock-closed" size={20} color="white" className="mr-2" />
            <Text className="text-white text-xl font-bold ml-2">Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;