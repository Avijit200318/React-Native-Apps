import { Stack } from 'expo-router';
import "../global.css";
import { StatusBar } from 'react-native';

export default function Layout() {
  return (
    <>
      <StatusBar className="text-white bg-[#2b2b2b]" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
