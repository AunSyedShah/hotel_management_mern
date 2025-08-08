import { createContext, useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = createContext(); // context is empty at this line

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthProvider(props) {
    const navigate = useNavigate();
    // Initialize synchronously from localStorage to avoid initial flicker
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem('auth_user');
            return raw ? JSON.parse(raw) : null;
        } catch (_) {
            return null;
        }
    });
    const [token, setToken] = useState(() => {
        try {
            return localStorage.getItem('auth_token') || null;
        } catch (_) {
            return null;
        }
    });

    // Keep storage in sync when values change
    useEffect(() => {
        try {
            if (user) localStorage.setItem('auth_user', JSON.stringify(user));
            else localStorage.removeItem('auth_user');
            if (token) localStorage.setItem('auth_token', token);
            else localStorage.removeItem('auth_token');
        } catch (_) {
            // ignore storage errors
        }
    }, [user, token]);

    // Attach Authorization header for axios when token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    // Global 401 handler: logout and redirect to login
    useEffect(() => {
        const interceptorId = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                const status = error?.response?.status;
                if (status === 401) {
                    logout();
                    navigate('/login', { replace: true });
                }
                return Promise.reject(error);
            }
        );
        return () => axios.interceptors.response.eject(interceptorId);
    }, [navigate]);

    const logout = () => {
        setUser(null);
        setToken(null);
        try {
            localStorage.removeItem('auth_user');
            localStorage.removeItem('auth_token');
        } catch (_) {
            // ignore storage errors
        }
    };

    const value = useMemo(() => ({ user, setUser, token, setToken, logout }), [user, token]);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}