import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue"
      }}
    >
      <Text style={{color: "white", fontWeight: "bold", fontSize: 17}}>Edit app/index.tsx to edit this screen. hello world</Text>
    </View>
  );
}
