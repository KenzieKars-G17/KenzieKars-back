import "express-async-errors";
import { handleErrors } from "./errors";
import express, { Application } from "express";
import userRoutes from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import advertisementRoutes from "./routers/advertisements.routes";
import commentsRoute from "./routers/comments.routes";

const app: Application = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/advertisement", advertisementRoutes);
app.use("/advertisement", commentsRoute);

app.use(handleErrors);

export default app;
