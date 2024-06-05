import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/auth/user', { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(() => setUser(null));
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:8080/auth/authenticate', { email, password }, { withCredentials: true });
        setUser(response.data);
        localStorage.setItem('authToken', response.data.token); // assuming the token is in response.data.token
    };

    const logout = async () => {
        await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true });
        setUser(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
