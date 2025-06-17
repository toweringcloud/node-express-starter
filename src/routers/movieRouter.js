import express from "express";

import {
  home,
  search,
  watch,
  addMovie,
  createMovie,
  editMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";

const movieRouter = express.Router();
// queries
movieRouter.get("/", home);
movieRouter.get("/search", search);
movieRouter.get("/movies/:id([0-9a-f]{24})", watch);
// mutations
movieRouter.route("/upload").get(addMovie).post(createMovie);
movieRouter
  .route("/movies/:id([0-9a-f]{24})/edit")
  .get(editMovie)
  .post(updateMovie);
movieRouter.route("/movies/:id([0-9a-f]{24})/delete").get(deleteMovie);

export default movieRouter;
