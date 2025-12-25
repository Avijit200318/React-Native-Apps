import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'

export default function settings() {
  const auth = getAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut(auth)
    router.push("/signin")
  }

  return (
    <SafeAreaView>
      <View className='h-full flex justify-center items-center'>
      <TouchableOpacity onPress={handleSignOut} className='px-4 py-2 bg-red-500 rounded-md'>
        <Text className='text-white'>Log Out</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}