import { AuthContext } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";

export default function SuperAdminLayout() {
    const authState = useContext(AuthContext);
  

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
                <Stack.Screen name="super_admin_home" options={{ headerShown: false }} />
            </Stack>
       </>
    )
}