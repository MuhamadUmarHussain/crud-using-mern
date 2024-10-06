import User from "../models/User.js";

const createUser=async(req, res)=>{
    try{
        const {name,father_name,email,phone} = req.body;

        const newUser = new User({
            name,father_name,email,phone
        });

        await newUser.save();
        res.status(200).json({sucess:true,Message:"User Sucessfully Created",newUser})

    }catch(err){
        res.status(500).json({sucess:false,Message:"Internal Server Error",err});

    }
}

const getUser=async(req,res)=>{
    try{
        const users = await User.find();
        if(!users){
            res.status(404).json({sucess:false,Message:'User Not Found'});
        }else{
            res.status(200).json({sucess:true,users});
        }
    }catch(err){
        res.status(500).json({sucess:false,Message:"Internal Server Error",err});
    }

}


const updateUser=async(req,res)=>{
    try{
       const userId = req.params.id;

        const updatedData = await User.findByIdAndUpdate(userId, req.body, {new: true});

        if(!updatedData){
            return res.status(404).json({sucess:true,Message:"User Not Found"})
        }else{
            return res.status(200).json({sucess:true,Message:"User Upated Sucessfully",updatedData})
        }

    }catch(error){
        res.status(500).json({sucess:false,Message:"Internal server error",error});

    }

}

const deleteUser=async(req,res)=>{
    try{
        const userId = req.params.id;
        const deletedUser = await User.deleteOne({_id: userId});

        if(!deletedUser){
            res.status(404).json({sucess:false,Message:"User Not found"});
        }else{
            res.status(200).json({sucess:true,Message:"Sucessfully Deleted",deletedUser});     
        }
        
    }catch(err){
        res.status(500).json({sucess:false,Message:"Initial server error"},err)
    }
}



export {createUser, getUser, updateUser, deleteUser}