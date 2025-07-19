/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"






 export const globalErrorHandler =    ( (err: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode = 500
    const message = "Something Went Wrong!! (from global handle error ) "


    res.status(statusCode).json({
       success: false, 
      message,
        err ,
        stack : process.env.NODE_ENV === "production" ? err.stack : "No Stack Found",

    })
}   )     

