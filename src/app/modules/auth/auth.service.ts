import AppError from "../../errorHelper/appError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import {  IUser } from "../user/user.interface";

import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";


/**
 * AuthService handles authentication-related operations such as user login and token management.
 * It provides methods for logging in with credentials and generating new access tokens using refresh tokens.
 */

const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    if (!email || !password) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email and Password are required")
    }
    if (typeof email !== 'string' || typeof password !== 'string') {
        throw new AppError(httpStatus.BAD_REQUEST, "Email and Password must be strings")
    }
    console.log("payload", payload);

    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }
    
   
    const userTokens = createUserTokens(isUserExist)

    // delete isUserExist.password;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExist.toObject()

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }

}

// // getNewAccestoken


const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}

export const AuthServices = {
    credentialsLogin,
    getNewAccessToken


}