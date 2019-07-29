const bcrypt = require("bcrypt");

const User = require("./models").User;

module.exports = {

    show(id, callback) {

    },

    create(values, callback) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(values.password, salt);

        User.create({
            username: values.username,
            email: values.email,
            password: hashedPassword
        })
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    },

    makeAdmin(id, callback) {
        User.findByPk(id)
        .then((user) => {
            user.update({role: "admin"})
            .then((res) => {
                callback(null, res);
            })
            .catch((err) => {
                callback(err);
            });
        })
        .catch((err) => {
            callback(err);
        })
    }

    

}