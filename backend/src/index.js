import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import {connectDB} from './lib/db.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT


app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors({
    origin: "http://localhost:5001", // Allow requests from this origin (frontend)
    credentials: true, // Allow credentials (cookies) to be sent
})); // Middleware to enable CORS
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);










app.listen(PORT, () => {
    console.log('Server is running on port:' + PORT);
    connectDB()
    });