import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    logIn: ()=> void;
    logOut: ()=> void;
}

const authStorageKey = 'token'

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    logIn: () => {},
    logOut: () => {}
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isReady, setIsReady] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    const logIn = ()=>{
        setIsLoggedIn(true)
        
    }

    const logOut = ()=>{
        setIsLoggedIn(false)
    }



    return (
        <AuthContext.Provider value={{isLoggedIn, isReady, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}


