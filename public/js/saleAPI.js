function getProductListByName(name) {
    fetch(`/product/search/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(list => {
        if(!list){
        }else{
            var data = ""
            list.forEach(product => {
                data += 
                `<tr>`+
                    `<td id="barcode" value="code">${product.barcode}</td>`+
                    //`<td value="img"><img src="" alt=""></td>`+
                    `<td id="productName" value="productName">${product.productName}</td>`+
                    `<td id="productPrice" value="productPriceFirst">${formatPrice(product.retailPrice)}</td>`+
                    `<td value="type">${product.category}</td>`+
                    `<td value="kho" id="productInventory">${parseInt(product.inventory)}</td>`+
                    `<td>`+
                        `<input type="hidden" value="${product._id}" id="productID">`+
                        `<button class="btn btn-info" id="addToOrderList">Thêm</button>`+
                    `</td>`+
                `</tr>`;
            });
            $('#listProduct').html(data);
        }
    })
    .catch(error => {
        console.error('Error getting list of product:', error.message);
    });
}

function addToCartByBarcode(barcode){
    fetch(`/product/${barcode}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(product => {
        if(product){
                const cartItems = {
                    _id : product._id,
                    barcode: product.barcode,
                    productName : product.productName,
                    retailPrice : formatPrice(product.retailPrice),
                    quantity : 1
                }
                let isItemInCart = false;

                for (let i = 0; i < listCart.length; i++) {
                    if (listCart[i].barcode === cartItems.barcode) {
                        listCart[i].quantity += 1;
                        isItemInCart = true;
                        break; 
                    }
                }
                if (!isItemInCart) {
                    listCart.push(cartItems);
                }
                showNotification("Thêm sản phẩm thành công!");
                updateCart();
        }else{
            showNotification("Không tìm thấy sản phẩm!");
        }
    })
    .catch (error => {
        console.error('Error getting product:', error.message);
    });
}

function createOrder(order){
    fetch(`/order/create`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
        body:`order=${JSON.stringify(order)}`,
    })
    .then((response) => response.json())
    .then(order => {
        if(order){
            console.log("Tạo đơn hàng mới thành công.");
            console.log(order)
        }else{
            console.log("Tạo đơn hàng mới thất bại.");
        }
    })
    .catch (error => {
        console.error('Error creating order:', error.message);
    });
}