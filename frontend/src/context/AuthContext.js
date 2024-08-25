import React, { createContext, useState } from 'react';
import {InvalidTokenError, jwtDecode} from 'jwt-decode'
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/login/', { email, password });
            setAccessToken(response.data.access);
            setRefreshToken(response.data.refresh);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            setUser(jwtDecode(response.data.access)); // Decode the JWT to get user info
            return response;
        } catch (error) {
            console.error('Login error', error);
            throw error;
        }
    };

    const signup = async (username, email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/signup/', { username, email, password });
            return response;
        } catch (error) {
            console.error('Signup error', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
