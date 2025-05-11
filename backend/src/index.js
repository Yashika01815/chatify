import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import path from "path";

import {connectDB} from './lib/db.js';
import { app, server } from "./lib/socket.js";
dotenv.config();

const PORT = process.env.PORT
const __dirname = path.resolve();



app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin (frontend)
    credentials: true, // Allow credentials (cookies) to be sent
})); // Middleware to enable CORS
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}






app.listen(PORT, () => {
    console.log('Server is running on port:' + PORT);
    connectDB()
    });