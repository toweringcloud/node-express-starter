import express from "express";

import {
  home,
  search,
  detail,
  addMovie,
  createMovie,
  updateMovie,
  editMovie,
  deleteMovie,
} from "../controllers/movieController";

const movieRouter = express.Router();
movieRouter.get("/", home);
movieRouter.get("/movies/:id([0-9a-f]{24})", detail);
movieRouter.get("/movies/:id([0-9a-f]{24})/delete", deleteMovie);
movieRouter
  .route("/movies/:id([0-9a-f]{24})/edit")
  .get(editMovie)
  .post(updateMovie);
movieRouter.get("/search", search);
movieRouter.route("/upload").get(addMovie).post(createMovie);

export default movieRouter;
