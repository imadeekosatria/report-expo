import { Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Reset() {
    const colorScheme = useColorScheme();
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colorScheme === "dark" ? "#1e293b" : "#fff",
                paddingHorizontal: 20,
            }}>
            <View>
                <Text
                    className="text-xl font-semibold mb-4"
                    style={{ color: colorScheme === "dark" ? "#f1f5f9" : "#1e293b" }}
                >
                    Reset Password
                </Text>
                <Text
                    className="mb-2"
                    style={{ color: colorScheme === "dark" ? "#94a3b8" : "#64748b" }}
                >
                    Silakan masukkan nama pengguna Anda untuk mengatur ulang kata sandi.
                </Text>
                <TextInput
                    placeholder="Nama Pengguna"
                    placeholderTextColor={colorScheme === "dark" ? "#94a3b8" : "#9CA3AF"}
                    style={{
                        backgroundColor: colorScheme === "dark" ? "#334155" : "#f3f4f6",
                        borderRadius: 10,
                        paddingStart: 15,
                        paddingEnd: 15,
                        width: '100%',
                        height: 48,
                        color: colorScheme === 'dark' ? 'white' : 'black',
                    }}
                />
                <TouchableOpacity className="w-full my-8 bg-blue-600 rounded-xl p-4 flex items-center justify-center">
                    <Text className={`text-slate-100 text-xl font-semibold`}>Reset</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}