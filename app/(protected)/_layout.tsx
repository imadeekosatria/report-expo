import { AuthContext } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { useColorScheme } from "react-native";

export default function ProtectedLayout() {
    const authState = useContext(AuthContext);
    const colorScheme = useColorScheme();

    if (!authState.isReady) {
        return null; // or a loading spinner
    }

    if (!authState.user?.authenticated) {
        return <Redirect href="/login" />;
    }

    return (
       <>
            <StatusBar style="auto" />
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="tambah-setoran" options={{
                    title: "Tambah Setoran",
                    animation: "slide_from_right",
                    headerStyle: {
                        backgroundColor: colorScheme === 'dark' ? "#020617" : "#f1f5f9",
                    },
                    headerTintColor: colorScheme === 'dark' ? "white" : "#020617",
                }}
                />
            </Stack>
       </>
    )
}