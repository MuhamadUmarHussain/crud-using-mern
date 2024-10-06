import express from 'express';
import db_con from "./utlis/db.js";
import dotenv from "dotenv";
dotenv.config();
import Routers from "./routes/routes.js"
import cors from "cors";

// mongodb connection
db_con();

const app = express();


app.use(express.json())
app.use(cors());
app.use("/api", Routers);


app.listen(process.env.PORT,()=>{
    console.log("server is running on port 4000");
})