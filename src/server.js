import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import storyRouter from "./routers/storyRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();

// Custom Middlewares
const logger = morgan("dev");
app.use(logger);

// Custom Routes
app.use("/", globalRouter);
app.use("/stories", storyRouter);
app.use("/users", userRouter);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});
