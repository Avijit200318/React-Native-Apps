import { View, Text, StatusBar, Image, ScrollView, ImageBackground, Platform, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur';
import { restaurants } from "../../store/resturants.js"
import Card from '@/components/card.tsx';

import logo from "../../assets/images/dinetimelogo.png";
import banner from "../../assets/images/homeBanner.png";

export type cardItemType = {
    name: string,
    seats: number,
    image: string,
    address: string,
    opening: string,
    closing: string
  }

export default function home() {
  // we don't have to use map for flat list its already included. We just need to add 
  const handleRenderItem = ({ item }: {item: cardItemType}) => (
    <Card item={item} />
  )

  return (
    <SafeAreaView className='flex-1 bg-[#2b2b2b]'>
      <StatusBar className="text-white bg-[#2b2b2b]" />
      <View className='w-full px-3 py-3'>
        <View className='flex flex-row items-center gap-4 px-4 rounded-md bg-[#5f5f5f]'>
          <Text className='text-white text-xl font-semibold'>Welcome</Text>
          <Image source={logo} className='w-28 h-20' />
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]} className=''>
        <ImageBackground resizeMode='cover' className='w-full h-52 flex justify-center items-center bg-[#2b2b2b]' source={banner}>
          <BlurView intensity={Platform.OS === 'ios' ? 100 : 25} className='w-full p-4 shadow-lg'>
            <Text className='text-white text-center text-3xl font-semibold'>Dine with your loved one</Text>
          </BlurView>
        </ImageBackground>
        <Text className='text-white px-4 text-2xl font-semibold mt-2 mb-4'>Special Discount %</Text>
        {restaurants.length > 0 ?
          <FlatList data={restaurants} renderItem={handleRenderItem} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true} className='mb-8' /> : <ActivityIndicator animating className='' />
        }
        <Text className='text-green-500 px-4 text-2xl font-semibold mt-2 mb-4'>Our Resturants</Text>
        {restaurants.length > 0 ?
          <FlatList data={restaurants} renderItem={handleRenderItem} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true} className='mb-8' /> : <ActivityIndicator animating className='' />
        }
        <Text className='text-yellow-500 px-4 text-2xl font-semibold mt-2 mb-4'>Late Night Dinner</Text>
        {restaurants.length > 0 ?
          <FlatList data={restaurants} renderItem={handleRenderItem} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true} className='mb-8' /> : <ActivityIndicator animating className='' />
        }
        <Text className='text-white px-4 text-2xl font-semibold mt-2 mb-4'>Up to 50% off</Text>
        {restaurants.length > 0 ?
          <FlatList data={restaurants} renderItem={handleRenderItem} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true} className='mb-4' /> : <ActivityIndicator animating className='' />
        }
      </ScrollView>
    </SafeAreaView>
  )
}