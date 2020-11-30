console.log('index')

const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./utils/database');
/**********************************/
const app = express();
const PORT = process.env.PORT || 3000;
/**************************************/
app.use(cors());
app.use(express.json());
/*****************************************/
const account = require('./routes/account');
/*****************************************/
app.get('/', (req, res) => res.send('API Running'));
app.use('/account', account);
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
