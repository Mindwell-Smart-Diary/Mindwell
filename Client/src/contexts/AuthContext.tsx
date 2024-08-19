import { LoginResultDto } from "@/types/LoginResultDto";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

export interface AuthContextProps {
    userId: string;
    login: (id: LoginResultDto) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(
    undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
}) => {
    const [loggedUserId, setLoggedUserId] = useState<string>(
        localStorage.getItem("loggedUserId") as string
    );

    const handleLogin = (result: LoginResultDto) => {
        localStorage.setItem("loggedUserId", result.id);
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);

        setLoggedUserId(result.id)
    }

    const value: AuthContextProps = {
        userId: loggedUserId as string,
        login: (result: LoginResultDto) => handleLogin(result),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
