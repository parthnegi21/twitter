// index.ts
import express from 'express';
import http from 'http';
import cors from 'cors';
import { startWebSocketServer } from './routes/socket';

import postRouter from './routes/post';
import connectionRouter from './routes/connection';
import reactRouter from './routes/react';
import userRouter from './routes/user';
import userMessage from './routes/message';

const app = express();

// Middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// REST API routes
app.use("/post", postRouter);
app.use("/connect", connectionRouter);
app.use("/react", reactRouter);
app.use("/profile", userRouter);
app.use("/message", userMessage);

// Create an HTTP server using Express
const httpServer = http.createServer(app);

// Start the WebSocket server and attach it to the HTTP server
startWebSocketServer(httpServer);

// Define the server port
const PORT = 5000;

// Start the combined server
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
