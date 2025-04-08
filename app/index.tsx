import { useState } from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native"

const share = require("@/assets/images/share.png")

export default function Index() {
  const [username, onChangeUsername] = useState<string>()
  const [password, onChangePassword] = useState<string>()
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={share}
        className="w-60 h-60 my-8"
        alt="Logo"
      />
      <View className="flex flex-col items-center justify-center w-full gap-y-4">
        <TextInput value={username} placeholder="username"  onChangeText={onChangeUsername} className="border rounded w-11/12 border-purple-600 border-collapse" />
        <TextInput value={password} secureTextEntry placeholder="password" onChangeText={onChangePassword} className="border rounded w-11/12 border-purple-600 border-collapse" />
        <TouchableOpacity onPress={()=>{console.log(username, password)}} className="bg-purple-600 rounded w-11/12 h-10 items-center justify-center">
          <TextInput className="text-white">Login</TextInput>
        </TouchableOpacity>
      </View>
    </View>
  );
}
