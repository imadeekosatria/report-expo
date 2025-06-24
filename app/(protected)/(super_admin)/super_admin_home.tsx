import { RiwayatSetoran, Transaction } from "@/components/riwayat-list";
import { AuthContext } from "@/utils/authContext";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from "expo-router";
import { useContext, useMemo } from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const { logOut, user } = useContext(AuthContext)

    // const themeBg = Platform.OS === "android" && colorScheme === "dark" ? "bg-slate-800" : "bg-slate-100";

    const themeText = Platform.OS === "android" && colorScheme === "dark" ? "text-slate-100" : "text-slate-900";

    const themeIcon = Platform.OS === "android" && colorScheme === "dark" ? "white" : "black";

    const greeting = useMemo(() => {
        const hour = new Date().getHours()
        if (hour >= 5 && hour < 12) return 'Selamat pagi'
        if (hour >= 12 && hour < 15) return 'Selamat siang'
        if (hour >= 15 && hour < 18) return 'Selamat sore'
        return 'Selamat malam'
    }, [])

    
    return (
        <SafeAreaView 
            style={{
            flex: 1,
            backgroundColor: colorScheme === "dark" ? "#1e293b" : "#fff", // #0f172a is a good dark background
            paddingHorizontal: 20,
            paddingTop: 12,
        }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="w-full h-full">
                <View className="w-full flex-row items-center gap-2 mb-10">
                    <MaterialIcons name="account-circle" size={32} color={themeIcon} />
                    <Text className={`text-xl ${themeText}`}>{greeting} <Text className={`capitalize font-semibold ${themeText}`}>{user?.username}</Text></Text>
                    <TouchableOpacity className="ml-auto" onPress={logOut}>
                        <MaterialIcons name="logout" size={28} color={themeIcon} />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center justify-between w-full mb-4 bg-[#2421A2] p-4 rounded-2xl h-40">
                    <Text className="text-white font-medium text-2xl">Total hari ini</Text>
                    <Text className="text-white font-medium text-2xl">Rp 1.500.000</Text>
                </View>
                <View className="w-full flex-row justify-between items-center mb-4">
                    <Text className={`${themeText} text-2xl font-semibold`}>Setoran hari ini</Text>
                    <Link href="/" asChild>
                        <Text className={`text-blue-500 text-base font-medium`}>Riwayat</Text>
                    </Link>
                </View>

                <View className="w-full space-y-2 flex gap-2">
                    {data.map((item) => (
                        <RiwayatSetoran key={item.id} item={item} />
                    ))}
                </View>
                <Link href="/tambah-setoran" asChild>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: 16,
                      right: 0,
                      backgroundColor: "#2421A2",
                      borderRadius: 32,
                      padding: 18,
                      elevation: 6,
                      shadowColor: "#2421A2",
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      shadowOffset: { width: 0, height: 4 },
                      zIndex: 20,
                    }}
                    activeOpacity={0.85}
                  >
                    <MaterialIcons name="add" size={28} color="white" />
                  </TouchableOpacity>
                </Link>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}




export const data: Transaction[] = [
    { id: 1, name: 'Budi', amount: 1500000, date: new Date('2025-04-13T10:00:00') },
    { id: 2, name: 'Siti', amount: 2000000, date: new Date('2024-04-12T14:30:00') },
    { id: 3, name: 'Joko', amount: 2500000, date: new Date('2024-04-11T09:15:00') },
]

