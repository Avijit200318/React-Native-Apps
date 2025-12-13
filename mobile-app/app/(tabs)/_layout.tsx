import { Tabs } from 'expo-router'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class TabLayout extends Component {
  render() {
    return (
      <Tabs>
        <Tabs.Screen name='home' options={{
            title: "Home",
            
        }} />
        <Tabs.Screen name='history' options={{
            title: "History",

        }} />
        <Tabs.Screen name='profile' options={{
            title: "Profile",

        }} />
        <Tabs.Screen name='settings' options={{
            title: "Settings",

        }} />
      </Tabs>
    )
  }
}

export default TabLayout
