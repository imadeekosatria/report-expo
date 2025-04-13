import { router, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar'
import "../global.css"
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";


export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
      <StatusBar style="dark" />
    </AuthProvider>
  )
}

export const Layout = () => {
  const {authState} = useAuth()

  
  return (
    <Stack 
      initialRouteName={authState?.authenticated ? "(protected)" : "index"}      
      screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
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
