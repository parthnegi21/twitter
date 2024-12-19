import WebSocket, { Server } from 'ws';
import { Server as HTTPServer } from 'http'; 
import client from "../prisma/db"

export function startWebSocketServer(server: HTTPServer) {
  const userConnections: { [userId:string]: WebSocket } = {};

  // Create the WebSocket server and bind it to the existing HTTP server
  const wss = new Server({ server });

  // When a WebSocket connection is established
  wss.on('connection', (ws: WebSocket) => {
    console.log('User connected');

    ws.on('message', async(message: WebSocket.Data) => {
      const { userId, type, targetUserId, content } = JSON.parse(message.toString());

      if (type === 'register') {
        userConnections[userId] = ws;
        console.log(`User ${userId} registered with WebSocket connection.`);
      }

      if (type === 'sendMessage') {
        if (userConnections[targetUserId]) {
          userConnections[targetUserId].send(
            JSON.stringify({ content, senderId: userId })
          );

          const savedMessage = await client.message.create({
            data:{
              fromUserId:userId,
              toUserId:parseInt(targetUserId,10) ,
              text:content

            }
          })
          console.log(`Message sent to ${targetUserId}`);
          console.log(savedMessage)

        } else {
          console.log(`${targetUserId} is offline`);
          const offlineMessage = await client.message.create({
            data:{
              fromUserId:userId,
              toUserId:parseInt(targetUserId,10) ,
              text:content
            }
          })
          console.log(offlineMessage)
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

    ws.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });
  });

  console.log('WebSocket server is ready!');
}
