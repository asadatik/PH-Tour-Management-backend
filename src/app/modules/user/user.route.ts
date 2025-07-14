import { Router } from "express";
import { UserControllers } from "./user.controller";



const router = Router()

 export const UserRoutes    =    router.post("/register", UserControllers.createUser) ;


