import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import taskRoutes from "./routes/tasks.js";
import boardRoutes from "./routes/boards.js";
import { setupWebSocket, emitEvent } from "./websocket/socket.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/boards", boardRoutes);

// Root test route
app.get("/", (req, res) => res.send("✅ Trello Realtime Backend Running"));

// Trello Webhook callback (POST + HEAD)
app.all("/webhook", (req, res) => {
  if (req.method === "HEAD") {
    // Trello webhook validation sends HEAD requests
    res.sendStatus(200);
  } else if (req.method === "POST") {
    const event = req.body;
    console.log("Webhook event received:", event);

    // Real-time broadcast to all connected clients
    emitEvent("trello-event", event);

    res.status(200).send("OK");
  } else {
    res.sendStatus(405); // Method Not Allowed for other HTTP methods
  }
});

// Error handling middleware
app.use(errorHandler);

// HTTP + WebSocket setup
const server = http.createServer(app);
setupWebSocket(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
