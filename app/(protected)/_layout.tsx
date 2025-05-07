import { AuthContext, AuthProvider } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";

export default function ProtectedLayout() {
    const authState = useContext(AuthContext)

    if (!authState.isReady) {
        return null; // or a loading spinner
    }

    if (!authState.user?.authenticated) {
        return <Redirect href="/login" />;
    }


    return (
        <AuthProvider>
            <StatusBar style="auto" />
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    )
}