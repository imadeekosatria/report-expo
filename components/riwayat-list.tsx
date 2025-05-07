import { Platform, Text, useColorScheme, View } from "react-native";

export type Transaction = {
    id: number;
    name: string;
    amount: number;
    date: Date;
}

const formatRelativeTime = (date: Date) => {
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

const formatToIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export const RiwayatSetoran = ({item} : {item: Transaction}) => {
    const colorScheme = useColorScheme();
    const themeText = Platform.OS === "android" && colorScheme === "dark" ? "text-slate-100" : "text-slate-900";
    return (
        <View className="flex-row items-center justify-between w-full rounded-2xl">
            <View className="flex-row items-center gap-x-4">
                <View className='flex gap-x-2'>
                    <Text className={`font-semibold text-lg ${themeText}`}>{item.name}</Text>
                    <Text className="text-gray-500">{formatRelativeTime(item.date)}</Text>
                </View>
            </View>
            <Text className="text-green-600 font-semibold">
                {formatToIDR(item.amount)}
            </Text>
        </View>
    )
}