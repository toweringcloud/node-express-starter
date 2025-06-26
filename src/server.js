import express from "express";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import movieRouter from "./routers/movieRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

// Templating Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// app.set("views", process.cwd() + "/src/views");

// Logger & Options
const logger = morgan("dev");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// Cookie Session
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localsMiddleware);

// Static Routes
app.use(express.static("public"));
app.use("/upload", express.static("files"));
app.use("/static", express.static("assets"));

// Dynamic Routes
app.use("/", rootRouter);
app.use("/movies", movieRouter);
app.use("/users", userRouter);

export default app;
