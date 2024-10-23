import express from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
import { userOrders } from "../controllers/orderController.js";


const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/userorders', authMiddleware, userOrders)

export default userRouter