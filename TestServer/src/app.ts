import express from 'express';
import cors from 'cors';
import errorhandler from 'strong-error-handler';
import * as bodyParser from 'body-parser';

import { sequelize } from './models';
import { departments } from './routers/department.router';
import {user} from "./routers/user.router";

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
  next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});
app.use('/user', user);
app.use('/departments', departments);

app.use(errorhandler({
    debug: true,
    log: true
  }))


app.listen(3001, () => {
    console.log('Example app listening on port 3001!')
});

