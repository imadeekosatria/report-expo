import { AuthContext } from "@/utils/authContext";
import { useContext, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const context = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUsernameFocused, setIsUsernameFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  const handleLogin = async() =>{
    if (!username || !password) {
        Alert.alert("Invalid Input", "Please enter a username and password", [{text: "OK"}])
        return;
    }
    context.logIn(username, password)
  }
  const colorScheme = useColorScheme();
  
  const themeBg = Platform.OS === "android" && colorScheme === "dark" ? "bg-slate-800" : "bg-slate-100";
  
  const themeText = Platform.OS === "android" && colorScheme === "dark" ? "text-slate-100" : "text-slate-900";

  const themeBorder = Platform.OS === "android" && colorScheme === "dark" ? "border-slate-100" : "border-slate-600";
  return (
    <SafeAreaView className={`h-screen w-screen ${themeBg}`}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding": "height"} className="flex items-center w-full h-full">
        <View className="mb-10">
          <Image source={require("../assets/images/share.png")} className="w-56 h-56" />
        </View>
        <View className="flex flex-col items-center w-full gap-y-4">
          <Text className={`text-3xl font-bold ${themeText}`}>Masuk</Text>
          <TextInput placeholder="Username" onFocus={()=> setIsUsernameFocused(true)} onBlur={()=>setIsUsernameFocused(false)} onChangeText={setUsername} autoCapitalize="none" placeholderTextColor="#9CA3AF" className={`border w-11/12 rounded-xl px-4 ${isUsernameFocused ? 'border-blue-600' : themeBorder}`}/>
          <TextInput placeholder="Password" onFocus={()=> setIsPasswordFocused(true)} onBlur={()=> setIsPasswordFocused(false)} secureTextEntry autoCapitalize="none"  placeholderTextColor="#9CA3AF" onChangeText={setPassword} className={`border w-11/12 rounded-xl px-4 ${isPasswordFocused ? 'border-blue-600' : themeBorder}`}/>
        </View>
        <TouchableOpacity className="w-11/12 mt-auto mb-4 bg-blue-600 rounded-full p-4 flex items-center justify-center" onPress={handleLogin}>
          <Text className={`text-slate-100 text-xl font-semibold`}>Masuk</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
