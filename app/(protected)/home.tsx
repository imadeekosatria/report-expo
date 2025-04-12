import { useAuth } from '@/context/AuthContext'
import { View, Text, Button, SafeAreaView } from 'react-native'

export default function Home() {
    const { onLogout } = useAuth()
    return (
      <SafeAreaView className='flex-1 py-8'>
      <View className='flex-1 items-center justify-center bg-white'>
        <Text>Home</Text>
        <Text>Hello</Text>
        <Button title="Logout" onPress={onLogout}/>
      </View>
      </SafeAreaView>
    )
}