"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./routes/socket");
const post_1 = __importDefault(require("./routes/post"));
const connection_1 = __importDefault(require("./routes/connection"));
const react_1 = __importDefault(require("./routes/react"));
const user_1 = __importDefault(require("./routes/user"));
const message_1 = __importDefault(require("./routes/message"));
const app = (0, express_1.default)();
// Middleware for CORS and JSON parsing
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// REST API routes
app.use("/post", post_1.default);
app.use("/connect", connection_1.default);
app.use("/react", react_1.default);
app.use("/profile", user_1.default);
app.use("/message", message_1.default);
// Create an HTTP server using Express
const httpServer = http_1.default.createServer(app);
// Start the WebSocket server and attach it to the HTTP server
(0, socket_1.startWebSocketServer)(httpServer);
// Define the server port
const PORT = 5000;
// Start the combined server
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
