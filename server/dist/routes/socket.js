"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebSocketServer = startWebSocketServer;
const ws_1 = require("ws");
const db_1 = __importDefault(require("../prisma/db"));
function startWebSocketServer(server) {
    const userConnections = {};
    // Create the WebSocket server and bind it to the existing HTTP server
    const wss = new ws_1.Server({ server });
    // When a WebSocket connection is established
    wss.on('connection', (ws) => {
        console.log('User connected');
        ws.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            const { userId, type, targetUserId, content } = JSON.parse(message.toString());
            if (type === 'register') {
                userConnections[userId] = ws;
                console.log(`User ${userId} registered with WebSocket connection.`);
            }
            if (type === 'sendMessage') {
                if (userConnections[targetUserId]) {
                    userConnections[targetUserId].send(JSON.stringify({ content, senderId: userId }));
                    const savedMessage = yield db_1.default.message.create({
                        data: {
                            fromUserId: userId,
                            toUserId: parseInt(targetUserId, 10),
                            text: content
                        }
                    });
                    console.log(`Message sent to ${targetUserId}`);
                    console.log(savedMessage);
                }
                else {
                    console.log(`${targetUserId} is offline`);
                    const offlineMessage = yield db_1.default.message.create({
                        data: {
                            fromUserId: userId,
                            toUserId: parseInt(targetUserId, 10),
                            text: content
                        }
                    });
                    console.log(offlineMessage);
                }
            }
        }));
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
