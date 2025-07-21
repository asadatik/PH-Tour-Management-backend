
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";

import bcryptjs from "bcryptjs"

// create a new user
const createUser = async (payload: Partial<IUser>) => {
    const { email, password , ...rest} = payload;


    // check if user already exists
    const isUserExit = await User.findOne({ email });
    if (isUserExit) {

        throw new Error("User already exists with this email");
    }




    const hashedPassword = await bcryptjs.hash(password as string, 10)

     const isHashed = await bcryptjs.compare( 'rrrrrrrrrrr', hashedPassword)  
    
    console.log("isHashed", isHashed);



        const authProvider : IAuthProvider = {
        provider: "credentials",
        providerId: email as string,
        }



    
    const user = await User.create({
        email,
        auths : [authProvider],
       ...rest
    })

    return   user

}

const getAllUsers = async () => {
    const users = await User.find({});
 
    return {
        users
    }
};






export const UserServices = {
    createUser,
    getAllUsers
    
}
