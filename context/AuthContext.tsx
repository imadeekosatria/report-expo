import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { router } from 'expo-router';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (username: string, password: string) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt'
export const API_URL = 'http://192.168.1.128:3000'; // Replace with your API URL
const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null,

    })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            console.log("stored:", token)

            if (token) {
                axios.defaults.headers.common['Authorization'] = token

                setAuthState({
                    token: token,
                    authenticated: true,
                })
                router.replace('/home')
            }
        }

        loadToken()
    },[])

    const register = async (username : string, password: string) => {
        try{
            return await axios.post(`${API_URL}/api/user`, {username, password})
        } catch (e){
            return {
                error: true,
                msg: (e as any).response.data.msg
            }
        }
    }

    const login = async (username : string, password: string) => {
        try{
            const result =  await axios.post(`${API_URL}/api/users/login`, {username, password})
            
            // console.log(result)
            
            setAuthState({
                token: result.data.data.token,
                authenticated: result.data.data.authenticated,
            })

            axios.defaults.headers.common['Authorization'] = `${result.data.data.token}`
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.data.token)

            return result
        } catch (e){
            return {
                error: true,
                msg: (e as any).response.data.errors
            }
        }
    }

    const logout = async () => {
        // Delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY)

        // Update HTTP headers
        axios.defaults.headers.common['Authorization'] = ''

        // Reset auth state
        setAuthState({
            token: null,
            authenticated: null,
        })

        router.replace('/')
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}