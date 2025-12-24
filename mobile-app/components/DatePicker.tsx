import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function DatePicker({date, setDate}: {date: Date, setDate: React.Dispatch<React.SetStateAction<Date>>}) {
    const [show, setShow] = useState<boolean>(false);

    // date time picker did't work same way in android and ios. so we have to manage it for android and ios

    const handlePress = () => {
        setShow(true);
    }

    const handleDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        setShow(false);
        setDate(selectedDate || date);
    }

    return (
        <View className='flex flex-row bg-[#5f5f5f] px-4 py-2 rounded-md '>
            <TouchableOpacity onPress={handlePress}>
                <Text className='text-green-500'>{date.toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'})}</Text>
                {show &&
                    <DateTimePicker value={date} mode='date' display='default' onChange={handleDateChange} minimumDate={date} maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))} />
                }
            </TouchableOpacity>
        </View>
    )
}