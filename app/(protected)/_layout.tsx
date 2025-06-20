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

    const userRole = authState.user?.role === 'ADMIN'
        ? '(admin)'
        : authState.user?.role === 'SUPER_ADMIN'
            ? '(super_admin)'
            : undefined;


    return (
        <>
            <StatusBar style="auto" />
            <Stack initialRouteName={userRole}>
                <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                <Stack.Screen name="(super_admin)" options={{ headerShown: false }} />
                <Stack.Screen name="tambah-setoran" options={{
                    title: "Tambah Setoran",
                    animation: "slide_from_right",
                    headerStyle: {
                        backgroundColor: colorScheme === "dark" ? "#1e293b" : "#fff",
                    },
                    headerTintColor: colorScheme === "dark" ? "#fff" : "#1e293b",
                    // headerShadowVisible: false
                }}
                />
            </Stack>
        </>
    )
}