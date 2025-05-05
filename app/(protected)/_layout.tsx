import { AuthContext, AuthProvider } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

export default function ProtectedLayout() {
    const authState = useContext(AuthContext)

    if (!authState.isReady) {
        return null; // or a loading spinner
    }

    if (!authState.isLoggedIn) {
        return <Redirect href="/login" />;
    }


    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name="home" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    )
}