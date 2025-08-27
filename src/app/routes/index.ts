import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { AuthRoutes } from "../modules/auth/auth.route"
import { DivisionRoutes } from "../modules/division/division.route"
import { OtpRoutes } from "../modules/otp/otp.route"
export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path : "/auth",
        route: AuthRoutes
    } ,
     //division routes
    {
      path : "/division",
      route: DivisionRoutes


    } ,

  {
        path: "/otp",
        route: OtpRoutes
    },


    
   
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route) 
})
