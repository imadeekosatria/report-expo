import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import axios, { isAxiosError } from "axios";
import { Alert } from "react-native";


SplashScreen.preventAutoHideAsync();

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    token?: string;
    logIn: (username: string, password: string) => void;
    logOut: () => void;
}

const authStorageKey = 'token'
const authState = 'auth-state'

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    token: undefined,
    logIn: () => { },
    logOut: () => { }
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isReady, setIsReady] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState<string | undefined>(undefined)
    const router = useRouter()

    const storeAuthState = async (newState: { isLoggedIn: boolean, token: string }) => {
        try {
            const jsonValue = JSON.stringify(newState.isLoggedIn);
            await AsyncStorage.setItem(authState, jsonValue);
            await SecureStore.setItemAsync(authStorageKey, newState.token)
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
            const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + '/users/login', {
                username: username,
                password: password
            })
            storeAuthState({ isLoggedIn: true, token: response.data.data.token })
            setIsLoggedIn(true)
            setToken(response.data.data.token)
            router.replace('/home')
        } catch (error) {
            if (isAxiosError(error)) {
                console.log("Error logging in", error.response?.data.errors)
                Alert.alert(
                    "Login Error",
                    error.response?.data.errors
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
            storeAuthState({ isLoggedIn: false, token: '' })
            setIsLoggedIn(false)
            setToken(undefined)
            router.replace('/login')
        } catch (error) {
            console.log("Error logging out", error)
            if (isAxiosError(error)) {
                console.log("Error logging out", error.response?.data.errors)

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
                    setIsLoggedIn(JSON.parse(value))
                    setToken(token)
                } else {
                    setIsLoggedIn(false)
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
        <AuthContext.Provider value={{ isLoggedIn, isReady, logIn, logOut, token }}>
            {children}
        </AuthContext.Provider>
    )
}