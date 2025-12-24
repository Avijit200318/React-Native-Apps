import { View, Text, ScrollView, FlatList, ActivityIndicator, Linking } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import Error from '@/components/Error';
import { resturantInfoType } from '../(tabs)/home';
import Crausol from '@/components/Crausol';
import { Ionicons } from '@expo/vector-icons';
import DatePicker from '@/components/DatePicker';
import GuestNumberBtn from '@/components/GuestNumberBtn';

export default function Resturant() {
  // fetch the id. its just like useParams in react
  const { id } = useLocalSearchParams();

  const [error, setError] = useState<string | null>(null);
  const [resturantInfo, setResturantInfo] = useState<resturantInfoType | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [guests, setGuests] = useState<number>(2);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const fetchResturantData = useCallback(async () => {
    if (!id) return;

    setError(null);
    try {
      const resturantRef = doc(db, "restaurants", Array.isArray(id) ? id[0] : id);
      const resturantDoc = await getDoc(resturantRef);

      if (!resturantDoc.exists()) {
        setError("Resturant information not present inside the database");
        return;
      }

      const resturantData = resturantDoc.data();

      // finding crousal with using res_id
      const crousalRef = collection(db, "carousels");
      const q = query(crousalRef, where("res_id", "==", `restaurants/${id}`));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("Crousal not found");
        setError("Crousals not found");
        return;
      }

      const carouselData = querySnapshot.docs[0].data();

      const slotsRef = collection(db, "slots");
      const q2 = query(slotsRef, where("ref_id", "==", `restaurants/${id}`));
      const querySnapshot2 = await getDocs(q2);
      if (querySnapshot2.empty) {
        console.log("Slots not found");
        setError("Slots not found");
        return;
      }

      const slotData = querySnapshot2.docs[0].data();

      const allData: resturantInfoType = {
        ...resturantData as resturantInfoType,
        images: carouselData.images as string[],
        slot: slotData.slot as string[]
      }
      setResturantInfo(allData);

    } catch (error) {
      setError("Couldn't load restaurants. Check your internet!");
      console.log("error", error);
    }
  }, [id, setResturantInfo]);

  useEffect(() => {
    fetchResturantData()
  }, [fetchResturantData])

  if (error) {
    return <Error setError={setError} error={error} customFunction={fetchResturantData} />
  }

  const handleRenderItem = ({ item }: { item: string }) => (
    <Crausol link={item} />
  )

  const handlePress = async () => {
    const url = "https://maps.app.goo.gl/HUiEVYPDFSCTmB4j6";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("url is not supported");
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-[#2b2b2b]'>
      <ScrollView className='h-full'>
        {(resturantInfo && !error) &&
          <View className='w-full py-4 px-3'>
            <Text className='text-green-500 font-semibold text-xl py-1.5 border-b-2 border-green-500'>{resturantInfo.name}</Text>
            <View className='h-56 w-full mt-4'>
              {(resturantInfo.images?.length || 0 > 0) ?
                <FlatList data={resturantInfo.images} renderItem={handleRenderItem} showsHorizontalScrollIndicator={false} horizontal className='rounded-l-xl' /> : <ActivityIndicator animating className='mt-8 mb-12' />}
            </View>
          </View>
        }
        <View className='flex-1 flex-row mt-2 py-2 px-6 gap-3'>
          <Ionicons name='location-sharp' size={24} color="#f49b33" />
          <Text className='text-white w-[90%]' onPress={handlePress}>{resturantInfo?.address} |{" "}<Text className='text-lg text-green-500 font-semibold'>Get Direction</Text></Text>
        </View>
        <View className='flex-1 flex-row mt-2 py-2 px-6 gap-3'>
          <Ionicons name='time-sharp' size={24} color="#f49b33" />
          <Text className='text-white w-[85%]'>{resturantInfo?.opening} AM - {resturantInfo?.closing} PM</Text>
        </View>
        <View className='flex-1 h-40 border justify-center border-green-500 mx-3 rounded-lg px-2 mt-3'>
          <View className='w-full h-14 flex flex-row justify-between items-center p-2'>
            <View className='flex flex-row items-center gap-2'>
              <Ionicons name='calendar' size={24} color="#f49b33" />
              <Text className='text-white'>Select booking date</Text>
            </View>
            <DatePicker date={date} setDate={setDate} />
          </View>
          <View className='w-full h-14 flex flex-row justify-between items-center p-2 mt-1 bg-[#5f5f5f] rounded-md'>
            <View className='flex flex-row items-center gap-2'>
              <Ionicons name='people' size={24} color="#f49b33" />
              <Text className='text-white'>Select number of guests</Text>
            </View>
            <GuestNumberBtn guests={guests} setGuests={setGuests} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}