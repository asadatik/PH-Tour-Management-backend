import {  Router } from "express";

import { AuthControllers } from "./auth.controller";

const router = Router()

router.post("/login", AuthControllers.credentialsLogin)
router.post("/refresh-token", AuthControllers.getNewAccestoken)
router.post("/logout", AuthControllers.logOutUser)







export const AuthRoutes = router;