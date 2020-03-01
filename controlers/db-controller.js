const PouchDB = require('pouchdb');
const path = require('path');
const pathImg = path.join(__dirname, '../uploadfiles');
const fs = require('fs');
PouchDB.plugin(require('pouchdb-find'));


class DbController {
    constructor() {
        this.db = new PouchDB('../db/products');
    }
    
    createProduct(_id, name, description, price, count, image) {
        return this.db.put({
            _id,
            name,
            description,  
            price, 
            count,
            image
            })
    }

    changeProduct(doc, changeData) {
        fs.unlinkSync(`${pathImg}/${doc.image}`)
        return this.db.put({
                ...doc, ...changeData
                });
    }

    getProduct(id) {
        return this.db.get(id)
    }

    getAllProducts() {
        return this.db.allDocs({include_docs: true})
    }

    deleteProduct(doc) {
        const id = doc._id;
        const rev = doc._rev;
        fs.unlinkSync(`${pathImg}/${doc.image}`);
        return this.db.remove(id, rev)
    }

    buyProduct(doc, prodCount) {
        const changeCountBuy = doc.count-prodCount;
        doc.count = changeCountBuy;
        return this.db.put(doc);
    }

    addCountProduct(doc, prodCount) {
        const fillCount = parseInt(prodCount)+doc.count;
        doc.count = fillCount;
        return this.db.put(doc);     
    } 
}


module.exports = DbController;
