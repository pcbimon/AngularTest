import { Router } from "express";
import {User} from "../models/user.model";
export const user = Router();

user.get('/', async (_req, res, next) => {
    try{
        res.json(await User.findAll());
    } catch (e) {
        next(e);
    }
});
user.get('/:id', async (_req, res, next) => {
    try{
        res.json(await User.findById(_req.params['id']));
    } catch (e) {
        next(e);
    }
});

