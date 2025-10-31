import { io } from "socket.io-client";

// Paste your token here for testing
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthZmthQHRlc3QuY29tIiwiX2lkIjoiNjkwMDQ4ZTBiOGIyZTliZDRjNjM1YzdlIiwiaWF0IjoxNzYxODI1MTI4LCJleHAiOjE3NjI0Mjk5Mjh9.XaE9K9wrv6BVK1B3eJ0bCryQ9JgqO0gs0_8Y-niP_mE';


const socket = io("http://localhost:5000", {
  path: "/socket.io",
  auth: { token },
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("Connected! Socket ID:", socket.id);
  socket.emit("ping");
});

socket.on("pong", () => {
  console.log("Received pong from server");
});

socket.on("connect_error", (err) => {
  console.error("Connect error:", err.message);
});
