import { useCallback, useState, useEffect } from "react";

const storageName = 'userData';

const useAuth = () => {
    const [ token, setToken ] = useState(null);
    const [ userId, setUserId ] = useState(null);
    const [ userName, setUserName ] = useState(null);

    const login = useCallback((t, id, name) => {
        setToken(t);
        setUserId(id);
        setUserName(name);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: t, userName: name
        }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserName(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId, data.userName);
        }
    }, [login])

    return { login, logout, token, userId, userName };
}

export default useAuth;