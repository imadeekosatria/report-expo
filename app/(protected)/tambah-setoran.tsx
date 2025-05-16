import { Text, TextInput, View } from "react-native";
import { useState } from "react";

export default function TambahSetoranScreen() {
    const [sales, setSales] = useState<string>("")
    return (

        <View className="bg-slate-100 dark:bg-slate-800">
            <TextInput placeholder="Sales" onChangeText={setSales} value={sales} className="border w-11/12 rounded-xl px-4 mt-4 mx-auto" />
            
        </View>
    )
}