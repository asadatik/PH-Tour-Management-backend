/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status-codes"

import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"
import AppError from "../../errorHelper/appError"

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

   const loginInfo = await AuthServices.credentialsLogin(req.body) ;



sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo,
    })
    
}
)

  

const getNewAccestoken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken  = req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];
  
    if (!refreshToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is required")
    }


   const TokenInfo = await AuthServices.getNewAccessToken(refreshToken  as string); ;



sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: TokenInfo,
    })
    
}
)   



export const AuthControllers = {
    credentialsLogin,
    getNewAccestoken
   
}