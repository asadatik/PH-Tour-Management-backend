
import { IUser } from "./user.interface";
import { User } from "./user.model";



// create a new user
const createUser = async (payload: Partial<IUser>) => {
    const { email, name } = payload;



    const user = await User.create({
        email,
        name,

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
