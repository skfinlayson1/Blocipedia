const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {

    home(callback) {
        Wiki.findAll()
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err);
        })
    },

    create(values, callback) {
        Wiki.create({
            title: values.title,
            body: values.body,
            userId: values.userId,
            private: values.private
        })
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err);
        })
    },

    show(id, callback) {

        const result = {};

        Wiki.findByPk(id)
        .then((wiki) => {
            result.wiki = wiki;
            User.findByPk(wiki.userId)
            .then((user) => {
                result.user = user;
                callback(null, result);
            })
        })
        .catch((err) => {
            callback(err);
        });
    },

    update(newValues, wikiId, callback) {
        Wiki.findByPk(wikiId)
        .then((wiki) => {
            wiki.update(newValues, {
                fields: Object.keys(newValues)
            })
            .then((res) => {
                callback(null, res);
            })
            .catch((err) => {
                callback(err);
            })
        })
        .catch((err) => {
            callback(err);
        })
    },

    destroy(id, callback) {
        Wiki.destroy({where: {id}})
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err);
        })
    }

} 