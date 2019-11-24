const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

class AuthControler {
    constructor() {
        this.db = new PouchDB('../db/auth');
    }
    checkPassword(login, password) {
        return this.db.find({
            selector: {login, password},
            fields: ['_id', 'login'],
        });

    }
    createUser(login, password, email) {
        return this.db.post({
            login,
            password,
            email,
        });
    }
    changePassword() {}
}
module.exports = AuthControler;
