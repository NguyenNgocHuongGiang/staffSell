const Product = require('../models/product');

const getProductService = async () => {
    try{
        return Product.find();
    }catch(error) {
        console.error('Error getting product:', error);
        throw error;
    }
}

const createProductService = async (productData) =>{
  try{
      const barcode = productData.barcode;
      const productName = productData.productName;
      const importPrice = productData.importPrice;
      const retailPrice = productData.retailPrice;
      const category = productData.category;
      const inventory = productData.inventory;

      const existingProduct = await Product.findOne({ barcode });
      if(existingProduct){
        existingProduct.inventory += inventory*1;
        await existingProduct.save();
        return { valid: true, message: `Product ${productName} updated successfully.`, code: 1 };
      }
      const product = new Product(productData);  
      product.barcode = barcode;
      product.productName = productName;
      product.importPrice = importPrice;
      product.retailPrice = retailPrice;
      product.category = category;
      product.inventory = inventory;
  
      if(await product.save()){
          return { valid: true, message: `Product ${productName} created successfully.`, code : 1 };
      } else{
          return { valid: false, message: 'Error creating product.', code : -1 };
      }
  }
  catch (error) {
    console.error(error);
    throw error;      
  }
}

const deleteByBarcode = async (barcode) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({barcode : barcode});
        if (!deletedProduct) {
          throw new Error('Not found product.');
        }
        return deletedProduct;
      } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
      }
}

const getProductbyBarcodeService = async (barcode) => {
  try{
      return await Product.findOne({ barcode: barcode});
  }catch(error) {
      console.error('Error product:', error);
      throw error;
  }
}

const updateProductService = async (product) => {
  try {
      var productUpdate = JSON.parse(product);
      const updateProduct = await Product.findOneAndUpdate({barcode : productUpdate.barcode}, productUpdate);
      if (!updateProduct) {
        throw new Error('Not found product.');
      }
      return updateProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
}

const getProductsByNameOrBarcodeService = async (partialNameOrBarcode) => {
  try {
    const regex = new RegExp(partialNameOrBarcode, 'i'); 

    const listProduct = await Product.find({
      $or: [
        { productName: { $regex: regex } },
        { barcode: { $regex: regex } }
      ]
    });

    if (listProduct.length > 0) {
      return listProduct;
    } else {
      return false;
    }

  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

module.exports = {getProductService, deleteByBarcode, createProductService, getProductbyBarcodeService, updateProductService, getProductsByNameOrBarcodeService};
