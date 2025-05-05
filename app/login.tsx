import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex w-full items-center justify-center h-full">
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={() => {}}/>
    </SafeAreaView>
  );
}
