import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import axios, { isAxiosError, isCancel } from "axios";
import { Alert } from "react-native";


SplashScreen.preventAutoHideAsync();

type User = {
    username: string;
    name: string;
    role: string;
    authenticated: boolean;
    token: string;
}

type AuthState = {
    isReady: boolean;
    user?: User;
    logIn: (username: string, password: string) => void;
    logOut: () => void;
}

export const authStorageKey = 'token'
export const authState = 'auth-state'

export const AuthContext = createContext<AuthState>({
    isReady: false,
    user: undefined,
    logIn: () => { },
    logOut: () => { }
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isReady, setIsReady] = useState(false)
    const [user, setUser] = useState<User | undefined>(undefined)
    const router = useRouter()

    const storeAuthState = async (newState: { user: User | undefined }) => {
        try {
            const userData = newState.user ? {
                username: newState.user.username,
                name: newState.user.name,
                role: newState.user.role,
                authenticated: newState.user.authenticated,
            } : undefined
            const jsonValue = JSON.stringify(userData);
            await AsyncStorage.setItem(authState, jsonValue);

            if (newState.user?.token) {
                await SecureStore.setItemAsync(authStorageKey, newState.user.token)
            }
        } catch (error) {
            console.log("Error storing auth state", error)
            Alert.alert(
                "Storage Error",
                `An error occurred while storing the auth state. \n${error}`
            )
        }
    };

    const logIn = async (username: string, password: string) => {
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 3000)
            const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + '/users/login', {
                username: username,
                password: password
            },
                {
                    signal: controller.signal,
                    timeout: 3000,
                })
            clearTimeout(timeoutId)

            if (response.data.data) {
                const userData: User = {
                    username: response.data.data.username,
                    name: response.data.data.name,
                    role: response.data.data.role,
                    authenticated: response.data.data.authenticated,
                    token: response.data.data.token
                }

                await storeAuthState({ user: userData })
                setUser(userData)
                router.replace('/')
            }
        } catch (error) {
            if (isCancel(error)) {
                Alert.alert(
                    "Connection Timeout",
                    "Request timed out. Please check your internet connection."
                )
                return
            }

            if (isAxiosError(error)) {
                if (!error.response) {
                    // Network error (no internet connection)
                    Alert.alert(
                        "Network Error",
                        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
                    )
                    return
                }

                if (error.code === 'ECONNABORTED') {
                    Alert.alert(
                        "Connection Error",
                        "Request terlalu lama. Periksa koneksi internet Anda."
                    )
                    return
                }

                // Server error with response
                Alert.alert(
                    "Login Error",
                    "Tidak dapat login, silakan coba lagi. \nError: " + error.response?.data.errors
                )
            }
        }
    }

    const logOut = async () => {
        try {
            await axios.delete(process.env.EXPO_PUBLIC_API_URL + '/users/current', {
                headers: {
                    'Authorization': `${await SecureStore.getItemAsync(authStorageKey)}`
                }
            }).then((response) => {
                console.log("Logout response", response.data)
            })
            SecureStore.deleteItemAsync(authStorageKey)
            await AsyncStorage.removeItem(authState)
            router.replace('/login')
        } catch (error) {
            console.log("Error logging out", error)
            if (isAxiosError(error)) {
                console.log("Error logging out", error.response?.data.errors)
                const errorMessage = error.response?.data.errors
                if (errorMessage === 'Unauthorized') {
                    Alert.alert(
                        "Logout Error",
                        "You are not logged in. Please log in again."
                    )
                    SecureStore.deleteItemAsync(authStorageKey)
                    await AsyncStorage.removeItem(authState)
                    router.replace('/login')
                    return
                }
                Alert.alert(
                    "Logout Error",
                    `An error occurred while logging out. \n${error.response?.data.errors}`
                )
            }
        }
    }


    useEffect(() => {
        const getAuthState = async () => {
            try {
                const value = await AsyncStorage.getItem(authState);
                const token = await SecureStore.getItemAsync(authStorageKey)

                if (value !== null && token !== null) {
                    setUser(JSON.parse(value))
                    // setToken(token)
                } else {
                    setUser(undefined)
                }
            } catch (error) {
                console.log("Error getting auth state", error)
                Alert.alert(
                    "Storage Error",
                    `An error occurred while getting the auth state. \n${error}`
                )
            }
            setIsReady(true)
        }
        getAuthState()
    }, [])

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync()
        }
    }, [isReady])



    return (
        <AuthContext.Provider value={{ isReady, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}