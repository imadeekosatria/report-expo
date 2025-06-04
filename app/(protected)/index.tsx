import { AuthContext } from "@/utils/authContext";
import { Redirect } from "expo-router";
import { useContext } from "react";

export default function ProtectedIndex() {
    const { user } = useContext(AuthContext);
    if (user?.role === 'ADMIN') {
        return <Redirect href="/(protected)/(admin)/home" />;    
    }else if (user?.role === 'SUPER_ADMIN') {
        return <Redirect href="/(protected)/(super_admin)/super_admin_home" />;
    }else{
        return <Redirect href="/login" />;
    }
    
}