import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_APP_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://knect-wc-dating-app.onrender.com'
    : 'http://localhost:5000');

let socket: Socket | null = null;

export const ConnectSocket = (token: string) => {
    if (!token) {
        console.warn('Socket connection skipped: No token provided');
        return null;
    }

    if (!socket || !socket.connected) {
        socket = io(SOCKET_URL, {
            path: '/socket.io',
            transports: ['websocket', 'polling'],
            auth: { token },
            reconnection: true,
            reconnectionAttempts: 20,
            reconnectionDelay: 2000,
            reconnectionDelayMax: 5000,
        });

        socket.on('connect', () => {
            console.log('Socket connected');
        })

        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected: ', reason);
        })

        socket.on('connect_error', (e) => {
            console.log('Socket connection error: ', e.message);
        })
    }

    return socket;
}

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        console.log('Socket disconnected manually');
        socket = null;
    }
};