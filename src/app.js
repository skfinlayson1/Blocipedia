const express = require("express");
const appConfig = require("./configuration/app-config");
const routeConfig = require("./configuration/route-config");

const app = express();

appConfig.init(app, express);
routeConfig.init(app);

module.exports = app;