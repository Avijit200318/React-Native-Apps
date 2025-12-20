import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { cardItemType } from '@/app/(tabs)/home'

export default function card({item}: {item: cardItemType}) {
  return (
    <TouchableOpacity className='bg-[#5f5f5f] max-h-68 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow'>
          <Image resizeMode='cover' source={{ uri: item.image }} className='h-28 mt-2 mb-1 rounded-lg' />
          <Text className='text-white text-lg font-bold my-2'>{item.name}</Text>
          <Text className='text-white text-sm mb-1'>{item.address}</Text>
          <Text className='text-white font-semibold mb-2'>Open: {item.opening} - Close: {item.closing}</Text>
        </TouchableOpacity>
  )
}