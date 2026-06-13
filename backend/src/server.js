import express from "express";
import cors from "cors"
import "dotenv/config"
import songRouter from "../src/routes/songs.route.js";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import albumRouter from "../src/routes/album.route.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
console.log('step 1')

//middlewares
app.use(express.json())
console.log('step 2')
app.use(cors())
console.log('step 3')

//initializing routes
app.use("/api/song", songRouter)
console.log('step 4')
app.use("/api/album", albumRouter)
console.log('step 5')
app.get('/', (req, res) => res.send("API Working"));
console.log('step 6')


app.listen(port, () => console.log(`Server started on ${port}`));