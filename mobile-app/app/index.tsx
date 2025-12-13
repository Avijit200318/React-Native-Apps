import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-blue-600 font-semibold text-2xl">Edit app/index.tsx to edit this screen. hello world...</Text>

      <TouchableOpacity onPress={() => router.push("/home")} className="mt-4 bg-blue-500 p-4 rounded-md">
        <Text className="text-white">Click Here</Text>
      </TouchableOpacity>
    </View>
  );
}
