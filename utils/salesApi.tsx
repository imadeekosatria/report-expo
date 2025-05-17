import axios, { isAxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { authStorageKey } from "./authContext";


export const getSalesName = async (sales: string) => {
    console.log("sales:", sales)
    try {
        const token = await SecureStore.getItemAsync(authStorageKey)
        if (!token) {
            throw new Error('No authentication token found')
        }
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL+`/sales?name=${encodeURIComponent(sales)}`, {
            headers: {
                'Authorization': token
            },
            timeout: 5000
        })
        console.log(response.data.data)
        // if (response.data) {
        return response.data.data
        // }
    }catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data.errors || 'Failed to fetch sales name'
        }else{
            return('An unexpected error occurred')
        }
    }
}