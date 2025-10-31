import React, {
    createContext, useContext, useState, ReactNode,
    useEffect,
} from "react";
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
        try {
            const res = await me();
            console.log(res);
            setUser(res);
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
