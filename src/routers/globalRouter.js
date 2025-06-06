import express from "express";
import { signUp, signIn, signOut } from '../controllers/userController.js';
import { trending, newStory } from '../controllers/storyController.js';

const globalRouter = express.Router();
globalRouter.get('/', trending);
globalRouter.get('/trending', trending);
globalRouter.get('/new', newStory);
globalRouter.get('/join', signUp);
globalRouter.get('/login', signIn);
globalRouter.get('/logout', signOut);

export default globalRouter;
