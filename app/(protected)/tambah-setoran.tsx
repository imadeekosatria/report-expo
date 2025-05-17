import { getSalesName } from "@/utils/salesApi";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";

type SalesName = {
    id: string;
    name: string;
}

export default function TambahSetoranScreen() {
    const [sales, setSales] = useState<string>("");
    const colorScheme = useColorScheme();
    const [salesName, setSalesName] = useState<SalesName[]>([]);  // Initialize with empty array
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const filteredData = useMemo(() => {
        // Early return if no search term or salesName is not an array
        if (!sales.trim() || !Array.isArray(salesName)) return [];
        
        return salesName.filter(item => 
            item && item.name && item.name.toLowerCase().includes(sales.toLowerCase())
        );
    }, [sales, salesName]);

    useEffect(() => {
        const fetchSalesName = async () => {
            if (!sales.trim()) {
                setSalesName([]); // Ensure we set an empty array
                return;
            }

            setIsLoading(true);
            const response = await getSalesName(sales);
            
            if (typeof response === 'string') {
                setError(response);
                setSalesName([]); // Ensure we set an empty array on error
            } else {
                setError(null);
                setSalesName(Array.isArray(response.data) ? response.data : []); // Ensure response is array
            }
            setIsLoading(false);
        };

        const timeOutId = setTimeout(() => {
            fetchSalesName();
        }, 300);

        return () => clearTimeout(timeOutId);
    }, [sales]);

    return (
        <View className="bg-slate-100 dark:bg-slate-800 flex-1">
            <View className="w-11/12 mx-auto mt-4 shadow-lg">
                <TextInput 
                    placeholder="Sales" 
                    onChangeText={setSales} 
                    value={sales} 
                    className="w-full rounded-xl px-4 py-3 bg-white dark:bg-slate-700 dark:shadow-none shadow-black/5 elevation-3" 
                />
            </View>
            {sales.trim() !== "" && (
                <View className="mt-2 mx-4">
                    <View className="bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm">
                        <ScrollView 
                            showsVerticalScrollIndicator={true}
                            indicatorStyle={colorScheme === 'dark' ? 'white' : 'black'}
                            className="max-h-40" // Maximum height of 10rem
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            {isLoading ? (
                                <View className="px-4 py-8">
                                    <Text className="text-gray-500 dark:text-gray-400 text-center">
                                        Memuat...
                                    </Text>
                                </View>
                            ) : error ? (
                                <View className="px-4 py-8">
                                    <Text className="text-red-500 dark:text-red-400 text-center">
                                        {error}
                                    </Text>
                                </View>
                            ): filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <TouchableOpacity 
                                        key={item.id} 
                                        className={`py-2 px-4 ${
                                            index < filteredData.length - 1 && 
                                            "border-b border-dashed border-gray-200 dark:border-slate-600"
                                        }`}
                                    >
                                        <Text className="text-gray-800 dark:text-gray-100">
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <View className="px-4 py-8">
                                    <Text className="text-gray-500 dark:text-gray-400 text-center">
                                        Tidak ada hasil ditemukan
                                    </Text>
                                </View>
                            )}

                        </ScrollView>
                    </View>
                </View>
            )}
        </View>
    );
}