/**
 * app.ts - Application for the server
 */

/* Importing modules */
import express, { Application } from "express";
import applyMiddlewares from "@middlewares/index.middleware";
import { checkAccessToken } from "@middlewares/token.middleware";
import { errorHandler } from "@middlewares/errorHandler.middleware";
import authRouter from "@routes/auth.route";
import userRouter from "@routes/user.route";
import todosRouter from "@routes/todo.route";
import postsRouter from "@routes/post.route";
import { CustomError } from "@utils/customError.util";

/* Creating the application */
const app: Application = express();

/* Setting up the middleware */
applyMiddlewares(app);

/* Setting up the routes */
app.use("/api/auth", authRouter);
app.use("/api/user", checkAccessToken, userRouter);
app.use("/api/todos", checkAccessToken, todosRouter);
app.use("/api/posts", checkAccessToken, postsRouter);

/* Route for public files */
app.use("/public", checkAccessToken, express.static("public"));
app.use("/public/uploads", checkAccessToken, express.static("public/uploads"));

app.use("*", (req, res) => {
  throw new CustomError("Route not found", 404, "NOT_FOUND", true, null);
});

app.use(errorHandler);

/* Exporting the application */
export default app;
