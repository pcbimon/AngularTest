import { sequelize } from '../models';

sequelize
    .authenticate()
    .then(async () => {
        console.log('Connection has been established successfully.');
        await sequelize.drop();
        await sequelize.sync();
        process.exit();
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
});
