const express = require('express');
const router = express.Router();
const Tasks = require('../models/tasks');
const taskCategories = require('../models/taskcategories');
const { body, validationResult } = require('express-validator');
