import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { AuthProvider } from "@/utils/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false, animation:"none" }} />
        <Stack.Screen name="(protected)" options={{ headerShown: false, animation:"none" }} />
      </Stack>
    </AuthProvider>
  );
}
