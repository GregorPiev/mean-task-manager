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
app.get('/', (req, res) => res.send('API Running'));
app.use('/login', require('./routes/login'));