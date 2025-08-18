import { createContext, ReactNode } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client"
import { useMemo } from "react";
export type SocketProviderType = {
    children : ReactNode
}


export const SocketContext = createContext<{ socket: ReturnType<typeof io> | null }>({ socket: null });

const SocketProvider = ({ children } : SocketProviderType) => {
    const socket = useMemo(
        () => io(`${import.meta.env.VITE_REACT_APP_BASE_URL}`, { withCredentials: true }),
        []
    );
    useEffect(() => {
        
        socket.on('connect', () => {
            console.log('Connected to server'  );
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
