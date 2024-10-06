import express from "express";
import { createUser, getUser, updateUser, deleteUser } from "../controllers/userController.js";


const routers = express.Router();

routers.post("/create", createUser);
routers.get("/get", getUser);
routers.put("/update/:id", updateUser);
routers.delete("/delete/:id", deleteUser);



export default routers;