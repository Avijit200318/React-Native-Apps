import { useRouter } from "expo-router";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "../assets/images/dinetimelogo.png"
import frameImg from "../assets/images/Frame.png"

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full m-2 flex justify-center items-center">
          <Image source={logo} className="w-[18rem] h-[18rem]" />
          <View className="w-3/4 flex gap-6">
            <TouchableOpacity onPress={() => router.push("/signup")} className="max-w-fit px-4 py-3 bg-orange-400 rounded-md">
              <Text className="text-xl font-semibold text-center">Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/home")} className="max-w-fit px-4 py-3 border border-orange-400 rounded-md">
              <Text className="text-xl font-semibold text-center text-orange-400">Guest User</Text>
            </TouchableOpacity>
          </View>
          <View className="w-3/4 mt-8 flex flex-row justify-center gap-4">
            <View className="w-28 border-b-2 border-orange-400"></View>
            <Text className="text-lg font-semibold text-white">or</Text>
            <View className="w-28 border-b-2 border-orange-400"></View>
          </View>
          <View className="flex flex-row items-center gap-3 mt-8">
            <Text className="text-white text-lg">Already have an account?</Text>
            <TouchableOpacity onPressOut={() => router.push("/signin")}><Text className="text-orange-400 font-semibold text-lg">Sign in</Text></TouchableOpacity>
          </View>
        </View>
        <View className="flex-1">
          <Image source={frameImg} className="w-full h-full" resizeMode="contain" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
