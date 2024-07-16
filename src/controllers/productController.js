const {getProductService, createProductService, deleteByBarcode, getProductbyBarcodeService, updateProductService, getProductsByNameOrBarcodeService} = require('../services/productService');

const getProducts = async (req,res) =>{
    const listProduct = await getProductService();
    res.json(listProduct);
}

const createProduct = async (req,res) =>{
    try{
        const product = req.body;
        const signUp = await createProductService(product);
        if(signUp.valid){
            console.log(signUp.message);
            res.json({code: signUp.code, message: signUp.message});
        }
        else{
            console.log(signUp.message);
            res.json({code: signUp.code, message: signUp.message});
        }
    }catch (error) {
        console.error(error);
        res.redirect('/');
    }
}

const deleteProduct = async (req,res) =>{
    res.json(await deleteByBarcode(req.query.barcode));
}

const getProcductbyBarcode = async (req,res) =>{
    const product = await getProductbyBarcodeService(req.params.barcode);
    res.json(product);
}

const updateProduct = async (req,res) =>{
    res.json(await updateProductService(req.body.product));
}

const getProductsByNameOrBarcode =  async (req,res) =>{
    res.json(await getProductsByNameOrBarcodeService(req.params.name));
}

module.exports = {getProducts, createProduct, deleteProduct, getProcductbyBarcode, updateProduct, getProductsByNameOrBarcode}