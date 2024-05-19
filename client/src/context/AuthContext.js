import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(localStorage.getItem('authToken'));

    const login = (token) => {
        setAuth(token);
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('authToken');
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuth(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
