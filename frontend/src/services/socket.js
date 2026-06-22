import { io } from "socket.io-client";

let socket = null;

export const initSocket = () => {
  const token = localStorage.getItem("gge_token");
  if (!token) return null;

  // If already connected, return existing socket
  if (socket && socket.connected) {
    return socket;
  }

  socket = io("https://gge-oisn.onrender.com", {
    auth: {
      token,
    },
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {
    console.log("🔌 Connected to real-time events gateway");
  });

  socket.on("disconnect", () => {
    console.log("🔌 Disconnected from events gateway");
  });

  socket.on("connect_error", (err) => {
    console.error("🔌 Socket connection error:", err.message);
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Closed real-time events connection");
  }
};
