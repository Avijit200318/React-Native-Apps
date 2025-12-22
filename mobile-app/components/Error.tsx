import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Error({setError, error, customFunction}: {setError: React.Dispatch<React.SetStateAction<string | null>>, error: string | null, customFunction: () => void}) {
    return (
        <SafeAreaView className='flex-1 bg-[#2b2b2b] justify-center items-center p-4'>
            <Text className='text-red-400 font-semibold text-lg text-center mb-4'>{error}</Text>
            <TouchableOpacity
                onPress={() => { setError(null); customFunction(); }}
                className='bg-green-500 px-6 py-2 rounded-full'
            >
                <Text className='text-white font-bold'>Try Again</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}