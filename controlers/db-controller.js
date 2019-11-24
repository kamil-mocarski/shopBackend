const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
class DbController {
    constructor() {
        this.db = new PouchDB('../db/products');
    }
    

    createProduct(name, count, description, price) {
        return this.db.post({
            name, 
            count, 
            description, 
            price
        });
    }

    getProduct(id) {
        return this.db.get(id);
    }
    getAllProducts() {
        return this.db.allDocs({include_docs: true});
    }
}



module.exports = DbController;