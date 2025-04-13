import { useAuth } from '@/context/AuthContext'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useMemo } from 'react'
import { FlashList } from '@shopify/flash-list'

const person1 = require('../../assets/images/person1.png')
const person2 = require('../../assets/images/person2.png')
const person3 = require('../../assets/images/person3.png')
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



const dataTest=[ {value:50}, {value:80}, {value:90}, {value:70} ]

export type Transaction = {
  id: number;
  name: string;
  amount: number;
  date: Date;  // Changed to Date type
  image: any;
}

export const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'Baru saja';
  if (minutes < 60) return `${minutes} menit yang lalu`;
  if (hours < 24) return `${hours} jam yang lalu`;
  if (days === 1) return 'Kemarin';
  if (days < 7) return `${days} hari yang lalu`;
  
  return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
  });
}

const data: Transaction[] = [
  { id: 1, name: 'Budi', amount: 1500000, date: new Date('2025-04-13T10:00:00'), image: person1 },
  { id: 2, name: 'Siti', amount: 2000000, date: new Date('2024-04-12T14:30:00'), image: person2 },
  { id: 3, name: 'Joko', amount: 2500000, date: new Date('2024-04-11T09:15:00'), image: person3 },
]

export default function Home() {
  const { onLogout } = useAuth()

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Selamat pagi'
    if (hour >= 12 && hour < 15) return 'Selamat siang'
    if (hour >= 15 && hour < 18) return 'Selamat sore'
    return 'Selamat malam'
  }, [])

  const renderItem = ({ item }: { item: Transaction }) => (
        <View className="flex-row items-center justify-between border-gray-100 w-full">
            <View className="flex-row items-center gap-x-4">
                <Image source={item.image} className="w-10 h-10 rounded-full" />
                <View className='flex gap-x-2'>
                    <Text className="font-semibold text-lg">{item.name}</Text>
                    <Text className="text-gray-500">{formatRelativeTime(item.date)}</Text>
                </View>
            </View>
            <Text className="text-green-600 font-semibold">
                Rp {item.amount.toLocaleString('id-ID')}
            </Text>
        </View>
    )
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex items-center bg-white p-4 h-full gap-y-8'>
        <View className='flex-row items-center justify-between w-full'>
          <View className='flex-row items-center gap-2'>
            <Image source={person1} className='w-12 h-12 rounded-full' />
            <Text className="text-gray-800 text-base">
              {greeting}, <Text className="font-bold">Admin!</Text>
            </Text>
          </View>
          <TouchableOpacity className='border-[#6A74EF] border rounded-lg w-10 h-10 flex items-center justify-center'>
            <FontAwesome6 name="calendar-days" size={16} color="#6A74EF" />
          </TouchableOpacity>
        </View>
        <View className='bg-[#2421A2] flex-row items-center justify-between w-full h-32 px-4 py-4 rounded-xl'>
          <Text className='text-slate-50 text-xl'>Total hari ini</Text>
          <Text className='text-slate-50 text-xl'>Rp 1.500.000</Text>
        </View>
        <View>
        </View>

        <View>
          <View className="flex-1">
            <View className='flex-row items-center justify-between w-full mb-4'>
                <Text className='font-semibold text-xl'>Setoran hari ini</Text>
                <Text className="text-blue-600">Riwayat</Text>
            </View>
            <View className='h-full'>
                <FlashList
                    data={data}
                    renderItem={renderItem}
                    estimatedItemSize={76}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}