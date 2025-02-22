import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import router from "./routes";
import { AppDataSource } from "./data-source";
import bodyParser from "body-parser";
import errorMiddleware from "@middlewares/errorHandler";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Ser");
});

app.use(bodyParser.json());

AppDataSource.initialize().then(() => {
  console.log('Database connected');
  router(app);

  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})

export default app;

