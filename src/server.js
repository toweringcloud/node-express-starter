import express from "express";
import morgan from "morgan";
import path from "path";

import { localsMiddleware } from "./middlewares";
import movieRouter from "./routers/movieRouter";

const app = express();
const logger = morgan("dev");

// Templating Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Custom Middlewares
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(localsMiddleware);

// Custom Routes
app.use("/", movieRouter);

export default app;
