const express = require('express');
const DbController = require('../controlers/db-controller');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');
const multer  = require('multer');
const pathImg = path.join(__dirname, '../uploadfiles')
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, pathImg); },
    filename: (req, file, cb) => { cb(null, file.originalname); }
    });
const upload = multer({storage: storage});

class DbRouter {
        constructor() {
            this.router = express.Router();
            this.controller = new DbController();
            this.routes();
        }
        routes() {

            this.router.get('/:id', jsonParser, this._getProduct.bind(this));

            this.router.get('/', jsonParser, this._getAllProducts.bind(this));
            
            this.router.delete('/:id', jsonParser, this._deleteProduct.bind(this));

            this.router.put('/:id/buy', jsonParser, this._buyProduct.bind(this));
            
            this.router.put('/:id/addcount', jsonParser, this._addCountProduct.bind(this));
            
            this.router.put('/:id', upload.single('file'),  this._changeProduct.bind(this));
            
            this.router.post('/:id', upload.single('file'),  this._createProduct.bind(this));
           
        }

        _createProduct(req, res) {
            const file = req.file.originalname;
            const {id, name, description, price, count} = req.body;
            this.controller.createProduct(id, name, description, price, count, file)
            .then(response => res.send(response))
            .catch(err => res.status(err.status).send(err));
        }

        _changeProduct(req, res) {
            const id = req.params.id;
            const file = req.file.originalname;
            const changeData = req.body;
            changeData.image = file;
            this.controller.getProduct(id)
            .then(doc => this.controller.changeProduct(doc, changeData))
            .then(response => res.send(response))
            .catch(err => res.status(err.status).send(err));
        }
             
        _getProduct(req, res) {
            const id = req.params.id;
            this.controller.getProduct(id)
            .then(response => res.send(response))
            .catch(err => res.status(err.status).send(err));
        }
        
        _getAllProducts(req, res) {
            this.controller.getAllProducts()
            .then(response => res.send(response))
            .catch(err => res.status(err.status).send(err));
        }

        _deleteProduct(req, res) {
            const id = req.params.id;
            this.controller.getProduct(id)
            .then(doc => this.controller.deleteProduct(doc))
            .then(response => res.send(response))
            .catch(err => res.status(err.status).send(err));
        }

        _buyProduct(req, res) {
            const id = req.params.id;
            const prodCount = req.body.count;
            this.controller.getProduct(id)
            .then(doc => this.controller.buyProduct(doc, prodCount))
            .then(response => res.send(response))
            .catch(err => res.status(err.status).send(err));
        }
        
        _addCountProduct(req, res) {
            const id = req.params.id;
            const prodCount = req.body.count;
            this.controller.getProduct(id)
            .then(doc => this.controller.addCountProduct(doc, prodCount))
            .then(response => res.send(response))
            .catch(err => res.status(err.status).send(err));
        }    
}

module.exports = DbRouter;