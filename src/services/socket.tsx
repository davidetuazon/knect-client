import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? "https://your-production-domain.com"
    : 'http://localhost:5000';

let socket: Socket | null = null;

export const ConnectSocket = (token: string) => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            path: '/socket.io',
            transports: ['websocket', 'polling'],
            auth: { token },
        });
    }
    return socket;
}

export const getSocket = () => socket;
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}
