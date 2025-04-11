import { useState } from "react";
import { View, Image, TextInput, TouchableOpacity, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const share = require("@/assets/images/share.png")

export default function Index() {
  const [username, onChangeUsername] = useState<string>()
  const [password, onChangePassword] = useState<string>()
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center">
        <Image
          source={share}
          className="w-60 h-60 my-8"
          alt="Logo"
        />
        <View className="w-full gap-y-4 px-4">
          <TextInput value={username} placeholder="Username" onChangeText={onChangeUsername} className="border rounded w-full border-[#92A6EB] border-collapse px-4" />
          <TextInput value={password} secureTextEntry placeholder="Password" onChangeText={onChangePassword} className="border rounded w-full border-[#92A6EB] border-collapse px-4" />
        </View>
      </View>
      <View className="p-4">
        <TouchableOpacity onPress={()=>{console.log(username, password)}} className="bg-[#2421A2] rounded-2xl w-full h-20 items-center justify-center">
          <Text className="text-white font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
