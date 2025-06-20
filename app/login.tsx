import { AuthContext } from "@/utils/authContext";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useContext, useRef, useState } from "react";
import { Alert, Animated, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const context = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUsernameFocused, setIsUsernameFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const iconAnim = useRef(new Animated.Value(1)).current;

  const handleLogin = async() =>{
    if (!username || !password) {
        Alert.alert("Invalid Input", "Please enter a username and password", [{text: "OK"}])
        return;
    }
    context.logIn(username, password)
  }

  const handleTogglePassword = () => {
  // Animate out
  Animated.sequence([
    Animated.timing(iconAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(iconAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start();
  setShowPassword((prev) => !prev);
}
  const colorScheme = useColorScheme();
  
  const themeText = Platform.OS === "android" && colorScheme === "dark" ? "text-slate-100" : "text-slate-900";

  const themeBorder = Platform.OS === "android" && colorScheme === "dark" ? "border-slate-100" : "border-slate-600";
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#1e293b" : "#fff", // #0f172a is a good dark background
        paddingHorizontal: 20,
        paddingTop: 12,
      }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding": "height"} className="flex items-center w-full h-full" keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}>
        {/* <View className="mb-10">
          <Image source={require("../assets/images/share.png")} className="w-56 h-56" />
        </View> */}
        <View className="flex flex-col w-full gap-y-4">
          <Text className={`text-3xl font-semibold mt-8 ${themeText}`}>Masuk</Text>
          <Text className="mb-4" style={{ color: colorScheme === "dark" ? "#94a3b8" : "#64748b" }}>
            Ayo mulai hari ini dengan login ke akunmu!
          </Text>
          <View className="flex flex-col gap-y-4 mt-">
            <Text style={{ color: colorScheme === "dark" ? "#94a3b8" : "#64748b" }}>Nama pengguna</Text>
            <TextInput
              placeholder="Masukkan nama pengguna"
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
              className={`border rounded-xl px-4 ${isUsernameFocused ? 'border-blue-600' : themeBorder}`}
              style={{ height: 48 }} // Add this line
            />
            <Text style={{ color: colorScheme === "dark" ? "#94a3b8" : "#64748b" }}>Kata Sandi</Text>
            <View className="relative">
              <TextInput
                placeholder="Masukkan kata sandi"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
                onChangeText={setPassword}
                className={`border rounded-xl px-4 pr-12 w-full ${isPasswordFocused ? 'border-blue-600' : themeBorder}`}
                style={{ height: 48 }} // Add this line
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 12, top: 0, bottom: 0, justifyContent: 'center' }}
                onPress={handleTogglePassword}
                activeOpacity={0.7}
              >
                <Animated.View style={{ opacity: iconAnim, transform: [{ scale: iconAnim }] }}>
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color={
                      showPassword
                        ? (colorScheme === "dark" ? "#e0e0e0" : "#1e293b")
                        : (colorScheme === "dark" ? "#fff" : "#7d7c7c")
                    }
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
            <Text className="text-right font-medium" style={{color:'#2563eb'}}>Lupa kata sandi?</Text>
          </View>
        </View>
        <TouchableOpacity className="w-full my-8 bg-blue-600 rounded-xl p-4 flex items-center justify-center" onPress={handleLogin}>
          <Text className={`text-slate-100 text-xl font-semibold`}>Masuk</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
