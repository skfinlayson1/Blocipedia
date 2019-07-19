module.exports = {

    init(app) {

        const staticRoutes = require("../routes/staticRoutes");
        const userRoutes = require("../routes/userRoutes");

        app.use(staticRoutes);
        app.use(userRoutes);

    }

}