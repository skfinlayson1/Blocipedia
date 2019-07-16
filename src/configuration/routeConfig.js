module.exports = {

    init(app) {

        const staticRoutes = require("../routes/staticRoutes");

        app.use(staticRoutes);

    }

}