const ApplicationPolicies = require("./application");

module.exports = class user extends ApplicationPolicies {

    _isOwner() {
        return this.user && this.record && (this.user.id === this.record.wiki.userId || this._isAdmin());
    }

}