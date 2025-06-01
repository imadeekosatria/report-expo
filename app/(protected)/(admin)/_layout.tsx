import { Stack } from "expo-router";

export default function AdminLayout(){
    return (
        <Stack>
            <Stack.Screen name="home" options={{ headerShown: false}} />            
        </Stack>
    )
}