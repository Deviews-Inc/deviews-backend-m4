import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./routes/users.routes";
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use(errorHandlingMiddleware);

export default app;
