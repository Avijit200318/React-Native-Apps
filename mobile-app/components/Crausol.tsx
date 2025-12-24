import { View, Image, Dimensions } from 'react-native'
import React from 'react'

export default function Crausol({ link }: { link: string }) {
    const { width } = Dimensions.get('window');

    return (
        <View style={{ width: width - 40 }} className='h-56 rounded-xl  overflow-hidden mx-1'>
            <Image source={{ uri: link }} className='w-full h-full object-cover' />
        </View>
    )
}