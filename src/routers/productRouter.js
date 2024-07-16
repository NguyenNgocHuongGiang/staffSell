const express = require("express");
const { getProducts, createProduct, deleteProduct, getProcductbyBarcode, updateProduct, getProductsByNameOrBarcode } = require('../controllers/productController');
const {checkAdmin} = require('../checkVaildUser');
const productRouter = express.Router();

productRouter.get('/list',getProducts);
productRouter.get('/search/:name', getProductsByNameOrBarcode);
productRouter.post('/create', checkAdmin, createProduct);
productRouter.delete('/delete',checkAdmin, deleteProduct);
productRouter.get('/:barcode', getProcductbyBarcode);
productRouter.put('/update', checkAdmin, updateProduct);

productRouter.get('/', checkAdmin, (req, res) => {
    res.render('product', {user : req.session.user});
});

module.exports = productRouter;