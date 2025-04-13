import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { View, Image, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const share = require("@/assets/images/share.png")

export default function Index() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { onLogin, onRegister } = useAuth()

  const login = async () => {
    const result = await onLogin!(username, password)
    console.log(result)
    if (result && result.error) {
      alert(result.msg)
    }else{
      router.push('/home')
    }
    // alert(username + password)
  }

  const register = async () => {
    const result = await onRegister!(username, password)
    if (result && result.error) {
      alert(result.msg)
    }else {
      login()
    }
  }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className="flex-1"
      >
        <View className="flex-1 items-center justify-between">
          <View className="w-full items-center">
            <Image
              source={share}
              className="w-60 h-60 my-8"
              alt="Logo"
            />
            <View className="w-full gap-y-4 px-4">
              <TextInput 
                value={username} 
                placeholder="Username" 
                onChangeText={(text: string) => setUsername(text)}
                autoCapitalize="none" 
                className="border rounded-xl w-full border-[#92A6EB] border-collapse px-4 h-12" 
              />
              <TextInput 
                value={password} 
                secureTextEntry 
                placeholder="Password" 
                onChangeText={(text: string) => setPassword(text)}
                autoCapitalize="none" 
                className="border rounded-xl w-full border-[#92A6EB] border-collapse px-4 h-12" 
              />
            </View>
          </View>
          <View className="p-4 w-full flex items-center">
            <TouchableOpacity 
              onPress={login} 
              className="bg-[#2421A2] rounded-2xl w-full h-14 items-center justify-center shadow"
            >
              <Text className="text-white font-semibold text-2xl">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
