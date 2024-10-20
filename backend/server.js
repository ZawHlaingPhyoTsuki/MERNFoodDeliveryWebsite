import express from "express"
import cors from "cors"



// app config
const app = express(); // initializing express
const port = 4000

// middleware
app.use(express.json()); //using this middleware, whenever we will get the request from the frontend, that will be parased and it will be in json format
app.use(cors()) //using this, we can access the backend from any frontend

app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
}) // to run the express server

