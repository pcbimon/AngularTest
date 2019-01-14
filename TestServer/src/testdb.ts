import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';

const app = express();

// Testing express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.listen(3001, () => {
    console.log('Example app listening on port 3001!')
});


// Connect to MySQL
const db = 'mussp_ing';
const username = "mussp";
const password = "C@bbage0nfire";
const host = "10.34.10.25";

export const sequelize = new Sequelize(db, username, password, {
    host: host,
    dialect: "mysql",
    port: 3306,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // Testing: define model
  const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  });
  
  sequelize.query("SELECT * FROM departments").then(myTableRows => {
    console.log(myTableRows)
  })
