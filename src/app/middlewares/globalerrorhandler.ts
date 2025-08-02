/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelper/appError"
import { envVars } from "../config/env"








export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    
    let statusCode = 500
    let message = "Something Went Wrong!!"


       const err

 //Duplicate error
    if (err.code === 11000) {
        statusCode = 400;
    
        message = `Duplicate field value entered: ${Object.keys(err.keyValue)[0]}` 
    }
    // Object ID error / Cast Error
    else if (err.name === "CastError") {
       
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;

    }

    // zod Validation Error
    else if (err.name === "ZodError") {
        statusCode = 400;
        message = 'zod Validation Error,,,,,,,,,,,,,,,,';

        console.log( err.issues);

   
    }




    // Mongoose Validation Error
    else if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((el: any) => el.message).join(", ");
    }

    // JWT Error
    else if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid Token";
    } else if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token Expired";
    }

      


    else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}