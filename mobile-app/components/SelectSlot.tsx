import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { resturantInfoType } from '@/app/(tabs)/home'

export default function SelectSlot({ resturantInfo, selectedSlot, setSelectedSlot }: { resturantInfo: resturantInfoType | null, selectedSlot: string | null, setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>> }) {
    const [showSlot, setShowSlot] = useState<boolean>(false);

    const handleShow = () => {
        setShowSlot(!showSlot);
    }

    const handleSlot = (slot: string) => {
        if(selectedSlot === slot){
            setSelectedSlot(null);
        }else{
            setSelectedSlot(slot);
        }
    }

    const handleBook = () => {
        
    }

    return (
        <View>
            <View className='flex-row gap-2 px-1'>
                <TouchableOpacity onPress={handleShow} className='w-1/2 bg-green-600 flex items-center py-2.5 rounded-md'>
                    <Text className='text-lg font-semibold'>Find Slots</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!selectedSlot} onPress={handleBook} className='w-1/2 bg-green-600 flex items-center py-2.5 rounded-md disabled:opacity-50'>
                    <Text className='text-lg text-white font-semibold'>Book Slot</Text>
                </TouchableOpacity>
            </View>
            {showSlot && <View className='flex flex-row flex-wrap gap-4 mt-4 px-3 bg-[#5f5f5f] py-4 rounded-md'>
                {resturantInfo?.slot?.map((ele, index) =>
                    <TouchableOpacity onPress={()=> handleSlot(ele)} key={index} className={`px-4 py-2 rounded-md ${selectedSlot === ele? 'bg-green-600' : 'bg-green-500'}`}>
                        <Text className='text-white'>{ele}</Text>
                    </TouchableOpacity>
                )}
            </View>}
        </View>
    )
}