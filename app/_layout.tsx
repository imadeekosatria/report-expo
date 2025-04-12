import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar'
import "../global.css"
import { AuthProvider, useAuth } from "@/context/AuthContext";


export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
      <StatusBar style="dark" />
    </AuthProvider>
  )
}

export const Layout = () => {
  const {authState, onLogout} = useAuth()

  return (
    <Stack>
      {authState?.authenticated ? (
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack>
  )

}
