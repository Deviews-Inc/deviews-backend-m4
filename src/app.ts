import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./routes/users.routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import sessionRoutes from "./routes/session.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use(handleErrorMiddleware);

export default app;
