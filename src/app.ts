import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app: Application = express();
// using parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const testServer = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "FitManage pro server is running",
  });
};
app.get("/", testServer);

export default app;
