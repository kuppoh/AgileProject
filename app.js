const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const router = express.Router();
const session = require('express-session');

const passport = require('./middleware/passport');
const userController = require('./controller/userController');
const adminController = require('./controller/adminController');