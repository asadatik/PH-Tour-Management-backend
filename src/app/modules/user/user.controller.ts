/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";

import httpStatus from 'http-status-codes';
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import AppError from "../../errorHelper/appError";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import { envVars } from "../../config/env";


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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

   const user = req.user;

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    const tokenInfo = createUserTokens(user)

    setAuthCookie(res, tokenInfo)

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: null,
    // })

    res.redirect(envVars.FRONTEND_URL)
})



export const UserControllers = {
  createUser,
  getAllUsers

}
