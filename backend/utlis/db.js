import mongoose, { mongo } from "mongoose";


const db_con = async()=>{
    try {

        await mongoose.connect(process.env.DB_URL);
        console.log("connection Sucessfull");
    } catch (error) {
        console.log("Connection Error: "+ error);
    }
} 

export default db_con;