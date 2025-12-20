import { Tabs } from 'expo-router'
import React, { Component } from 'react'
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from 'react-native';

export class TabLayout extends Component {
  render() {
    return (
      <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f49b33",
        tabBarInactiveTintColor: "#ecedee",
        tabBarStyle: {
          backgroundColor: "#2b2b2b",
          paddingBottom: 20,
          paddingTop: 5,
          height: 80
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 5
        },
      }}>
        <Tabs.Screen name='home' options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />
        }} />
        <Tabs.Screen name='history' options={{
          title: "History",
          tabBarIcon: ({ color }) => <AntDesign name="history" size={24} color={color} />
        }} />
        <Tabs.Screen name='profile' options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle-outline" size={28} color={color} />
        }} />
        <Tabs.Screen name='settings' options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />
        }} />
      </Tabs>
    )
  }
}

export default TabLayout
