module.exports = {

    init(app) {

        const staticRoutes = require("../routes/static-routes");
        const userRoutes = require("../routes/user-routes");
        const wikiRoutes = require("../routes/wiki-routes");
        const stripeRoutes = require("../routes/stripe-routes");

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(wikiRoutes);
        app.use(stripeRoutes);

    }

}