import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-blue-600 font-semibold text-2xl">Edit app/index.tsx to edit this screen. hello world...</Text>
    </View>
  );
}
