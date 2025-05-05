import { AuthContext } from "@/utils/authContext";
import { useContext, useState } from "react";
import { Alert, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const context = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async() =>{
    if (!username || !password) {
        Alert.alert("Invalid Input", "Please enter a username and password", [{text: "OK"}])
        return;
    }
    context.logIn(username, password)
  }
  
  return (
    <SafeAreaView className="flex w-full items-center justify-center h-full">
      <TextInput placeholder="Username" onChangeText={setUsername} autoCapitalize="none"/>
      <TextInput placeholder="Password" secureTextEntry autoCapitalize="none" onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin}/>
    </SafeAreaView>
  );
}
