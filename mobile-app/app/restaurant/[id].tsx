import { View, Text, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'

export default function Resturant() {
  const {id} = useLocalSearchParams();
  // fetch the id. its just like useParams in react
  console.log(id)

  return (
    <SafeAreaView className='flex-1 bg-[#2b2b2b]'>
      <ScrollView className='h-full'>
        <View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}