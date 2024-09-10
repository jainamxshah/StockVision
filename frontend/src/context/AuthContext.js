// import React, { createContext, useState } from 'react';
// import {InvalidTokenError, jwtDecode} from 'jwt-decode'
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
//     const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));

//     const login = async (email, password) => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/users/login/', { email, password });
//             setAccessToken(response.data.access);
//             setRefreshToken(response.data.refresh);
//             localStorage.setItem('access_token', response.data.access);
//             localStorage.setItem('refresh_token', response.data.refresh);
//             setUser(jwtDecode(response.data.access)); // Decode the JWT to get user info
//             return response;
//         } catch (error) {
//             console.error('Login error', error);
//             throw error;
//         }
//     };

//     const signup = async (username, email, password) => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/users/signup/', { username, email, password });
//             return response;
//         } catch (error) {
//             console.error('Signup error', error);
//             throw error;
//         }
//     };

//     const logout = () => {
//         setUser(null);
//         setAccessToken(null);
//         setRefreshToken(null);
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//     };

//     return (
//         <AuthContext.Provider value={{ user, accessToken, login, signup, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;
// export {AuthContext}

import React, { createContext, useState, useEffect } from 'react';
import {InvalidTokenError, jwtDecode} from 'jwt-decode'
import axios from 'axios';

const AuthContext = createContext();
// const refreshToken = async () => {
//     try {
//         const response = await axios.post('http://localhost:8000/api/users/refresh/', { refresh: refreshToken });
//         const { access } = response.data;
//         setAccessToken(access);
//         localStorage.setItem('access_token', access);
//         setUser(jwtDecode(access)); // Decode the new JWT to get user info
//     } catch (error) {
//         console.error('Token refresh error', error);
//         logout();
//     }
// };


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
    const [isAuth, setIsAuth] = useState(false); 
    // Decode token and update user state
    useEffect(() => {
        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);
                setUser(decoded);
                setIsAuth(true);
            } catch (error) {
                console.error('Token decoding error', error);
                logout(); // Logout if token is invalid
            }
        }
    }, [accessToken]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/login/', { email, password });
            const { access, refresh } = response.data;
            setAccessToken(access);
            setRefreshToken(refresh);
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            setUser(jwtDecode(access)); // Decode the JWT to get user info
            setIsAuth(true)
            return response;
        } catch (error) {
            console.error('Login error', error);
            throw error;
        }
    };

    const signup = async (username, email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/signup/', { username, email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            
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
        setIsAuth(false)
    };

    return (
        <AuthContext.Provider value={{ isAuth,user, accessToken, refreshToken, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export { AuthContext };

