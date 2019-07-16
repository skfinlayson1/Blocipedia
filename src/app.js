const express = require("express");

const appConfig = require("./configuration/appConfig");
const routeConfig = require("./configuration/routeConfig");

const app = express();

appConfig.init(app, express);
routeConfig.init(app);

module.exports = app;