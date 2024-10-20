import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"; // .js required
import foodRouter from "./routes/foodRoute.js";



// app config
const app = express(); // initializing express
const port = 4000

// middleware
app.use(express.json()); //using this middleware, whenever we get the request from the frontend, that will be parased and it will be in json format
app.use(cors()) //using this, we can access the backend from any frontend

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); // to serve images

app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
}) // to run the express server
