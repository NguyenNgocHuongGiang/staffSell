const Order = require('../models/order');
const Product = require('../models/product');
const moment = require('moment');

const getOrderService = async () => {
    try{
        return await Order.find();
    }catch(error) {
        console.error('Error getting list of orders:', error);
        throw error;
    }
}

// const createOrderService = async (orderData) => {
//     try{
//         console.log(JSON.parse(orderData));
//         const order = new Order(JSON.parse(orderData));
//         if(await order.save()){
//             return order;
//         }
//         else{
//             return false;
//         }
//     }catch(error) {
//         console.error('Error creating order:', error);
//         throw error;
//     }
// }

const createOrderService = async (orderData) => {
    try {
        console.log(JSON.parse(orderData));
        const parsedOrderData = JSON.parse(orderData);
        const order = new Order(parsedOrderData);

        // Lưu đơn hàng mới
        const savedOrder = await order.save();

        // Duyệt qua từng sản phẩm trong đơn hàng và cập nhật tồn kho
        for (const product of parsedOrderData.products) {
            const dbProduct = await Product.findById(product.productId);
            if (!dbProduct) {
                throw new Error(`Không tìm thấy sản phẩm với ID ${product.productId}`);
            }
            if (dbProduct.inventory < product.quantity) {
                throw new Error(`Không đủ số lượng tồn kho cho sản phẩm ${dbProduct.name}`);
            }
            dbProduct.inventory -= product.quantity;
            await dbProduct.save();
        }

        return savedOrder;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

const getOrderByCustomerIdService = async (id) => {
    try{
        const history = await Order.find({customerId: id})
            .populate('saleId')
            .populate('customerId')
            .populate('products.productId')
            .sort({purchaseDate : 1});
        if(history){
            return history
        }else{
            return false;
        }
         
    }catch(error) {
        console.error('Error getting history purchase:', error);
        throw error;
    }
}

const getOrderByTimeService = async (start,end) => {
    try{
        const startTime = moment(start).startOf('day').toISOString();
        const endTime = moment(end).endOf('day').toISOString();
        return await Order.find({
            purchaseDate: {
                $gte: startTime,
                $lte: endTime
            }
        })
            .populate('saleId')
            .populate('customerId')
            .populate('products.productId')
            .sort({purchaseDate : 1});
    }catch(error) {
        console.error('Error getting list of orders by time:', error);
        throw error;
    }
}


module.exports = {getOrderService, createOrderService, getOrderByTimeService, getOrderByCustomerIdService};