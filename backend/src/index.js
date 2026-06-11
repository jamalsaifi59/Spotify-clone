import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";

dotenv.config({
    path: './env'
})

connectDB()