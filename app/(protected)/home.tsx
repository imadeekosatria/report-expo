import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const { logOut } = useContext(AuthContext)
    return (
        <SafeAreaView className="flex w-full items-center justify-center h-full">
            <Text>Home Screen</Text>
            <Text>Welcome to the app!</Text>
            <Button title="Logout" onPress={logOut} />
        </SafeAreaView>
    )
}