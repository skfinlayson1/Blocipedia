require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const validator = require("express-validator");
const flash = require("express-flash");
const session = require("express-session");
//const morgan = require("morgan");

const viewsFilePath = path.join(__dirname, "..", "views");
const assetsFilePath = path.join(__dirname, "..", "assets");


module.exports = {

    init(app, express) {

        app.set("views", viewsFilePath);
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(express.static(assetsFilePath));
        app.use(validator());
        app.use(session({
            secret: "123456", // Fix this
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1.21e+9 }
        }))
        app.use(flash());
        //app.use(morgan("dev"));

    }

};