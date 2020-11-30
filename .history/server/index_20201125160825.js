console.log('index')

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
/**********************************/
const app = express();
const PORT = process.env.PORT || 3000;
/**************************************/
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use(express.json());
/*****************************************/
const account = require('./routes/account');
const tasks = require('./routes/tasks');
/*****************************************/
app.get('/', (req, res) => res.send('API Running'));
app.use('/account', account);
app.use('/tasks', tasks);
/************************************/
async function start() {
    try {
        await sequelize.sync();
        app.listen(PORT);

    } catch (error) {
        console.log('Start:', error);
    }
}

start();
