import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./routes/users.routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import sessionRoutes from "./routes/session.routes";
import postRoutes from "./routes/post.routes";
import firesRoutes from "./routes/fire.routes";
import techsRoutes from "./routes/techs.routes";
import CommentRoutes from "./routes/comments.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/posts", postRoutes);
app.use("/fires", firesRoutes);
app.use("/techs", techsRoutes);
app.use("/comments", CommentRoutes);
app.use(handleErrorMiddleware);

export default app;
