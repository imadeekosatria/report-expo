import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";

export default function AppLayout() {
  const { authState, onLogout } = useAuth()
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
    </Stack>

  )
}