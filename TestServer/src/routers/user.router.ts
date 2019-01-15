import { Router } from "express";
import {User} from "../models/user.model";
export const user = Router();

user.get('/', async (_req, res, next) => {
    try{
        User
            .findAll()
            .then((data) => {
                console.log(data);
                console.log('123');
                return res.json(data);
            })
            .catch((err) => {
                console.log(err);
                return err;
            })
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

