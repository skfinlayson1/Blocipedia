const bcrypt = require("bcrypt");

const User = require("./models").User;

module.exports = {

    show(id, callback) {

    },

    create(values, callback) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(values.password, salt);

        User.create({
            userName: values.userName,
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

    

}