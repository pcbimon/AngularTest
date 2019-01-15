import { Router } from "express";
import {User} from "../models/user.model";
export const user = Router();

user.get('/', async (_req, res, next) => {
    try{
        User.findAll()
            .then((data) => {
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
user.post('/register',async(req, res, next)=>{
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    }catch(e){
        next(e);
    }
});

user.post('/checkuser',async(req, res, next)=>{
    try{
        const userdata = req.body;
        User.findOne({ where: {username: userdata.username, password: userdata.password} }).then(data => {
            return res.json(data);
        })
    }catch(e){
        next(e);
    }
});

