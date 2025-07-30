/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status-codes"

import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"
import AppError from "../../errorHelper/appError"
import { setAuthCookie } from "../../utils/setCookie"

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

   

   const loginInfo = await AuthServices.credentialsLogin(req.body) ;


//    // set the access token in cookies
//     res.cookie("accessToken", loginInfo.accessToken, {
//         httpOnly: true,
//         secure: false
//     })
//     // set the refresh token in cookies   
//         res.cookie("refreshToken", loginInfo.refreshToken, {
//             httpOnly: true, 
//                secure : false
//         } )

// set the access and refresh tokens in cookies
     setAuthCookie(res, loginInfo)



sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo,
    })
    
}
)

//  gwtNewAccestoken      

const getNewAccestoken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken  = req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];
  
    if (!refreshToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is required")
    }


   const TokenInfo = await AuthServices.getNewAccessToken(refreshToken  as string); ;

    // set the new access token in cookies
    setAuthCookie(res, TokenInfo)

sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token Generated Successfully",
        data: TokenInfo,
    })
    
}
)  




// logOutUser
const logOutUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    
    // clear the access token cookie 
    res.clearCookie("accessToken" ,  {  
        httpOnly: true,
        secure: false ,
        sameSite: "lax" 
       }  );

    // clear the refresh token cookie
    res.clearCookie("refreshToken"
        , {  
        httpOnly: true,
        secure: false ,
        sameSite: "lax" 

       }
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged Out Successfully",
        data: null,
    })

})


// Exporting the controllers


export const AuthControllers = {
    credentialsLogin,
    getNewAccestoken ,
    logOutUser
   
}