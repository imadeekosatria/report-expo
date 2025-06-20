import { AuthProvider } from "@/utils/authContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false, animation:"none" }} />
        <Stack.Screen
          name="reset"
          options={{
            animation: "slide_from_right",
            title: "Reset Password",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#1e293b" : "#f1f5f9",
            },
            headerTintColor: colorScheme === "dark" ? "#f1f5f9" : "#1e293b",
            headerShadowVisible: false
          }}
        />
        <Stack.Screen name="(protected)" options={{ headerShown: false, animation:"none" }} />
      </Stack>
    </AuthProvider>
  );
}
