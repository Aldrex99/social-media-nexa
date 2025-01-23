/**
 * app.ts - Application for the server
 */

/* Importing modules */
import express, { Application } from "express";
import { checkAccessToken } from "./middlewares/token.middleware";
import applyMiddlewares from "./middlewares/index.middleware";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import todosRouter from "./routes/todo.route";
import postsRouter from "./routes/post.route";

/* Creating the application */
const app: Application = express();

/* Setting up the middleware */
applyMiddlewares(app);

/* Setting up the routes */
app.use("/api/auth", authRouter);
app.use("/api/user", checkAccessToken, userRouter);
app.use("/api/todos", checkAccessToken, todosRouter);
app.use("/api/posts", checkAccessToken, postsRouter);

app.use("*", (req, res) => {
  res.status(404).json("Not Found");
});

/* Exporting the application */
export default app;
