
import { IUser } from "./user.interface";
import { User } from "./user.model";



// create a new user
const createUser = async (payload: Partial<IUser>) => {
    const { email, ...rest} = payload;


    // check if user already exists
    const isUserExit = await User.findOne({ email });
    if (isUserExit) {

        throw new Error("User already exists with this email");
    }





    
    const user = await User.create({
        email,
       ...rest
    })

    return user

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
