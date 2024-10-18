// useAuth.js
import { useEffect, useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Check if token exists
    }, []);

    return isAuthenticated;
};

export default useAuth;
