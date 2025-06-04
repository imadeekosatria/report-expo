import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AdminLayout() {
    return (
        <>
            <StatusBar style="auto" />
            <Stack>
                <Stack.Screen name="home" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}