import 'dotenv/config';

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { Server } from "socket.io";

import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";

import userRoutes from "./routes/users.routes.js";
import { config } from "node:process";
const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port" , process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit:"40kb", extended: true }));

app.use("/api/v1/users" , userRoutes);



const start = async () => {
    const connectionDB = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo connected to Host: ${connectionDB.connection.host}`);
    server.listen(app.get("port") , ()=>{
        console.log("listening on port 8000");
    })
}

start();