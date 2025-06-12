import express from 'express';
import { home, detail, filter, getAdd, postAdd, getEdit, postEdit } from '../controllers/movieController';

const movieRouter = express.Router();
movieRouter.get('/', home);
movieRouter.get('/filter', filter);
movieRouter.get('/:id(\\d+)', detail);
movieRouter.route('/add').get(getAdd).post(postAdd);
movieRouter.route('/edit').get(getEdit).post(postEdit);

export default movieRouter;
