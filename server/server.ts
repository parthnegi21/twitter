// server.ts
import http from 'http';
import express from 'express';

// Function to create an HTTP server
export const createHttpServer = (app: express.Application) => {
  return http.createServer(app);
};
