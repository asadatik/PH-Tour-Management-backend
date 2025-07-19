/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";

import httpStatus from 'http-status-codes';
import { UserServices } from "./user.service";


const createUser = async (req: Request, res: Response  , next : NextFunction) => {
  try {
   
   
    const user = await UserServices.createUser(req.body)

    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user
    })
  }
   


  
 catch (err: any) {
     console.log(
        "🚀 ~ file: user.controller.ts ~ line 15 ~ createUser ~ error",
        next(err)
     )
       
}
}



export const UserControllers = {
  createUser,

}
