import React, {
    createContext, useContext, useState, ReactNode,
    useEffect,
} from "react";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../utils/constants";
import { ConnectSocket } from "../services/socket";
import { me } from "../services/api";

type AuthContextValue = {
    user: any,
    setUser: (user: any) => void,
};

type Props = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider(props: Props) {

    const [user, setUser] = useState<any>(null);

    const init = async () => {
        const token = Cookies.get(ACCESS_TOKEN);
        if (!token) return;
        try {
            const res = await me();
            setUser(res);
            ConnectSocket(token);
        } catch (e) {
            setUser(null);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <AuthContext.Provider
        value={{
            user,
            setUser,
        }}
    >
        {props.children}
    </AuthContext.Provider>
};
