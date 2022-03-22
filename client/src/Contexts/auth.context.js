import { createContext } from "react";

export const authContext = createContext({
    token: null,
    userId: null,
    userName: null,
    login: () => {},
    logout: () => {},
    isAuthentificated: false
})