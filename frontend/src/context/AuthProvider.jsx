import { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext(); // context is empty at this line

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthProvider(props) {

    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}