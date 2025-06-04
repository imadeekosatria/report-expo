import { BottomSheetSetoran } from "@/components/bottom-sheet";
import { getSalesName } from "@/utils/salesApi";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    const [selectedSales, setSelectedSales] = useState<SalesName | null>(null);
    const [isOpen, setIsOpen] = useState(false);  // Add this new state
    const [openSheet, setOpenSheet] = useState(false);

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

    const handleSalesChange = (sales: SalesName) => {
        setSelectedSales(sales);
        setSales(sales.name);  // Update input value
        setIsOpen(false);      // Close dropdown
    }

    const handleInputFocus = () => {
        setIsOpen(true);       // Open dropdown on focus
        if (selectedSales) {
            setSales("");      // Clear input when reopening
            setSelectedSales(null);
        }
    }

    const handleSheetChange = (open: boolean) => {
        setOpenSheet(open);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="w-full h-full pb-4">
            <SafeAreaView className="flex w-full h-full bg-slate-100 dark:bg-slate-950">
                <View className="flex-1 px-4">
                    <View className="w-full mx-auto mt-4 shadow-lg">
                        <TextInput
                            placeholder="Sales"
                            onChangeText={setSales}
                            value={sales}
                            onFocus={handleInputFocus}
                            className="w-full rounded-xl px-4 py-3 bg-white dark:text-white dark:bg-slate-700 dark:shadow-none shadow-black/5 elevation-3"
                        />
                    </View>
                    {sales.trim() !== "" && isOpen && (
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
                                    ) : filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <TouchableOpacity
                                                key={item.id}
                                                className={`py-2 px-4 ${index < filteredData.length - 1 &&
                                                    "border-b border-dashed border-gray-200 dark:border-slate-600"
                                                    }`}
                                                onPress={() => handleSalesChange(item)}
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
                    {selectedSales && (
                        <Text className="dark:text-white mx-4 mt-2">
                            Selected: {selectedSales.name}
                        </Text>
                    )}
                    {openSheet === false && (
                        <TouchableOpacity onPress={() => { handleSheetChange(true) }} className="z-20 absolute bottom-10 right-4 bg-[#2421A2] rounded-full p-4">
                            <MaterialIcons name="add" size={24} color="white" />
                        </TouchableOpacity>
                    )}
                    {openSheet && (
                        <View className="w-full h-full ">
                            <BottomSheetSetoran setOpenSheet={setOpenSheet} />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}