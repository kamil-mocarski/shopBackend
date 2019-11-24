const express =require('express');
const DbController = require('../controlers/db-controller');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

class DbRouter {
        constructor() {
            this.router = express.Router();
            this.controller = new DbController();
            this.routes();
        }
        routes() {
            
            this.router.post('/', jsonParser, this._createProduct.bind(this));

            this.router.get('/:id', jsonParser, this._getProduct.bind(this));

            this.router.get('/', jsonParser, this._getAllProducts.bind(this));
        }
    
        
        _createProduct(req, res) {
            const productData = req.body;
            this.controller.createProduct(productData.name, productData.count, productData.description, productData.price)
            .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
        }
        
        _getProduct(req, res) {
            const id = req.params.id;
            this.controller.getProduct(id)
            .then(response => res.send(response))
            .catch(err => res.status(500).send(err));

        }
        
        _getAllProducts(req, res) {
            this.controller.getAllProducts()
            .then(response => res.send(response))
            .catch(err => res.status(500).send(err));

            
        }
    
}

module.exports = DbRouter;