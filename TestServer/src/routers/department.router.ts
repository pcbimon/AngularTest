import { Router } from "express";
import { Department} from "../models/department.model";
export const departments = Router();

departments.get('/', async (_req, res, next) => {
  try{
    res.json(await Department.findAll({attributes: ['id', 'name', 'acronym']}));
  } catch (e) {
    next(e);
  }
});
departments.get('/:id', async (_req, res, next) => {
  try{
    res.json(await Department.findById(_req.params['id']));
  } catch (e) {
    next(e);
  }
});
departments.post('/', async (_req, res, next) => {
  try{
    console.log(_req.body);
    // res.json(await Department.create(_req.body));
  } catch (e) {
    next(e);
  }
});

