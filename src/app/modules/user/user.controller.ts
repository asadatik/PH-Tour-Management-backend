import  { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus  from 'http-status-codes';


const  createUser = async (req : Request , res :  Response   ) => {
    try {
          const { name, email }  = req.body ;
           const user  = await User.create({name , email})  
           
      res.status(httpStatus.CREATED).json({message : ' User created  !! ' , user }) 
           

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }  catch (error :any) {
      console.log (error);
      res.status(httpStatus.BAD_REQUEST).json({message : `somethings went wrong !! ${error.message}` , error }) 
        
    }
}



export const UserControllers = {
    createUser,
   
}
