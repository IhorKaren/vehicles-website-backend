import { Request, Response, NextFunction } from "express";
import { CustomError } from "helpers/HttpError";
import express from "express";
import logger from "morgan";
import cors from "cors";

import authRouter from "./routes/api/authRouter";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ message: err.message });
});

export default app;
