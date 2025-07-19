import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
const app: Application = express();
// using parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", router);

const testServer = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "FitManage pro server is running",
  });
};
app.get("/", testServer);
// inclune in not found api middlewares
app.use(notFound);

export default app;
