import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js"; // .js - don't forget
import multer from "multer"; // multer is pre-build in the node.js // image storage system

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage}) // middle upload has been created

foodRouter.post("/add", upload.single("image"), addFood) // upload.single("image") is used to upload a single image // ("image") ===> then we have to use image when testing in postman
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)
// foodRouter.delete("/remove", removeFood);





export default foodRouter