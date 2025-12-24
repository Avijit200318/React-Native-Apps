import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function GuestNumberBtn({guests, setGuests}: {guests: number, setGuests: React.Dispatch<React.SetStateAction<number>>}) {

    const handleIncrement = () => {
        if(guests === 12) return;
        setGuests(guests + 1);
    }

    const handleDecrement = () => {
        if(guests === 0) return;
        setGuests(guests - 1);
    }
    
    return (
        <View className='flex flex-row gap-3 items-center'>
            <TouchableOpacity onPress={handleDecrement} className='w-10 py-0.5 border border-green-400 rounded-2xl'><Text className='text-center font-semibold text-white text-xl'>-</Text></TouchableOpacity>
            <Text className='text-lg text-white'>{guests.toString().padStart(2, '0')}</Text>
            <TouchableOpacity onPress={handleIncrement} className='w-10 py-0.5 border border-green-400 rounded-2xl'><Text className='text-center font-semibold text-white text-xl'>+</Text></TouchableOpacity>
        </View>
    )
}