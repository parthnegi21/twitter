"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebSocketServer = startWebSocketServer;
const ws_1 = require("ws");
function startWebSocketServer(server) {
    const userConnections = {};
    // Create the WebSocket server and bind it to the existing HTTP server
    const wss = new ws_1.Server({ server });
    // When a WebSocket connection is established
    wss.on('connection', (ws) => {
        console.log('User connected');
        ws.on('message', (message) => {
            const { userId, type, targetUserId, content } = JSON.parse(message.toString());
            if (type === 'register') {
                userConnections[userId] = ws;
                console.log(`User ${userId} registered with WebSocket connection.`);
            }
            if (type === 'sendMessage') {
                if (userConnections[targetUserId]) {
                    userConnections[targetUserId].send(JSON.stringify({ content, senderId: userId }));
                    console.log(`Message sent to ${targetUserId}`);
                }
                else {
                    console.log(`${targetUserId} is offline`);
                }
            }
        });
        ws.on('close', () => {
            for (const userId in userConnections) {
                if (userConnections[userId] === ws) {
                    delete userConnections[userId];
                    console.log(`User ${userId} disconnected.`);
                    break;
                }
            }
        });
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
    console.log('WebSocket server is ready!');
}
