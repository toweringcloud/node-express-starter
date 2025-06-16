import express from "express";

import {
  home,
  search,
  detail,
  addMovie,
  createMovie,
  editMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";

const movieRouter = express.Router();
movieRouter.get("/", home);
movieRouter.get("/search", search);
movieRouter.get("/movies/:id([0-9a-f]{24})", detail);
movieRouter.route("/upload").get(addMovie).post(createMovie);
movieRouter
  .route("/movies/:id([0-9a-f]{24})/edit")
  .get(editMovie)
  .post(updateMovie);
movieRouter.get("/movies/:id([0-9a-f]{24})/delete", deleteMovie);

export default movieRouter;
