require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("express-flash");

const viewsFilePath = path.join(__dirname, "..", "views");
const assetsFilePath = path.join(__dirname, "..", "assets");

module.exports = {

    init(app, express) {

        app.set("views", viewsFilePath);
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(express.static(assetsFilePath));
        app.use(flash());

    }

};