const bcrypt = require("bcrypt");

module.exports = {

    comparePassword(userPassword, databasePassword) {
        return bcrypt.compareSync(userPassword, databasePassword);
    },

    morgan(app) {
        if(process.env.NODE_ENV != "production") {
            const morgan = require("morgan");
            app.use(morgan("dev"));
        }
    }

}