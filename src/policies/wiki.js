const ApplicationPolicies = require("./application");

module.exports = class wiki extends ApplicationPolicies {

    _isOwner() {
        return this.user && this.record && (this.user.id === this.record.wiki.userId || this._isAdmin());
    }

    allowedToView() {
        if(this.user) {
            return this.user.role === "admin" || !this.record.private || this.user.id === this.record.userId;
        } else {
            return !this.record.private;
        }
    }

}