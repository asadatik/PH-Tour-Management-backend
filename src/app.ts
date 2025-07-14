import express, {  Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";


const app  = express();
app.use(cors())
app.use(express.json())


app.use("/api/v1/user", UserRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to library App");
});


export default app;

