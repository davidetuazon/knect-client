import { io } from "socket.io-client";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthZmthQHRlc3QuY29tIiwiX2lkIjoiNjkwMDQ4ZTBiOGIyZTliZDRjNjM1YzdlIiwiaWF0IjoxNzYxODI1MTI4LCJleHAiOjE3NjI0Mjk5Mjh9.XaE9K9wrv6BVK1B3eJ0bCryQ9JgqO0gs0_8Y-niP_mE';
const conversationId = "6902c1ec75a29c36c5af7286";

export const socket = io("http://localhost:5000", {
  path: "/socket.io",
  auth: { token },
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("Connected! Socket ID:", socket.id);

  // Join the conversation
  socket.emit("joinRoom", { conversationId });

  // Send a test message
  socket.emit("message", { conversationId, message: "Hello from React!" });
});

socket.on("newMessage", (msg) => {
  console.log("New message received:", msg);
});

socket.on("connect_error", (err) => {
  console.error("Connect error:", err.message);
});

socket.on("error", (err) => {
  console.error("Socket error:", err);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});