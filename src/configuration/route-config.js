module.exports = {

    init(app) {

        const staticRoutes = require("../routes/static-routes");
        const userRoutes = require("../routes/user-routes");
        const wikiRoutes = require("../routes/wiki-routes");

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(wikiRoutes);

    }

}