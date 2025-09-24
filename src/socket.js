import { io } from "socket.io-client";

const SOCKET_URL = "https://kitchen-ledger-backend-api.onrender.com";

const socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"],
});

export default socket;
