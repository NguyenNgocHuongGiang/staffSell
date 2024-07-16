function getProductList() {
    fetch('/product/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
        .then((response) => response.json())
        .then(list => {
            console.log('Get the list of products successfully');
            var data = '';
            list.forEach(product => {
                const formattedImportPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.importPrice);
                const formattedRetailPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.retailPrice);
                data +=
                    `<tr>` +
                    `<td id="barcode">${product.barcode}</td>` +
                    `<td id="productName">${product.productName}</td>` +
                    `${role == "ADMIN" ? `<td id="importPrice">${formattedImportPrice}</td>` : ""}` +
                    `<td id="retailPrice">${formattedRetailPrice}</td>` +
                    `<td id="category">${product.category}</td>` +
                    `<td id="inventory">${product.inventory}</td>` +
                    `${role == "ADMIN" ?  `<td> <button class="btn btn-info" data-toggle="modal" data-target="#editProduct" id = "editButton">Cập nhật</button> <button class="btn btn-danger" data-toggle="modal" data-target="#deleteProduct" id="deleteButton">Xóa</button></td >` :  " "}`+
                    `</tr > `;
            });
            $('#listProduct').html(data);
        })
        .catch(error => {
            console.error('Error getting list of product:', error.message);
        });
}

function createProduct(product){
    fetch('/product/create',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
        body:`barcode=${product.barcode}&productName=${product.productName}&importPrice=${product.importPrice}&retailPrice=${product.retailPrice}&category=${product.category}&inventory=${product.inventory}`,
    })
    .then((response) => response.json())
    .then(data => {
        if(data.code == 1){
            getProductList();
            showNotification("Tạo sản phẩm mới thành công!");
        }
        else if(data.code == 0){
            showAlert(data.message);
        }else{
            showAlert(data.message);
        }
        
    })
    .catch (error => {
        console.error('Error creating product:', error.message);
    });
}

function deleteProduct(){
    var barcode = $('#barcodeDelete').val();
    fetch(`/product/delete?barcode=${barcode}&`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(message => {
        console.log(message)
        showNotification("Xóa sản phẩm thành công!");
        getProductList();
    })
    .catch (error => {
        console.error('Error getting list of product:', error.message);
    });
}


function getOneProductByBarcode(barcode){
    fetch(`/product/${barcode}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(product => {
        console.log('Get the product successfully');
        console.log(product.barcode);
        $('#barcodeEdit').val(product.barcode);
        $('#productNameEdit').val(product.productName);
        $('#importPriceEdit').val(product.importPrice);
        $('#retailPriceEdit').val(product.retailPrice);
        $('#categoryEdit').val(product.category);
        $('#inventoryEdit').val(product.inventory);
    })
    .catch (error => {
        console.error('Error getting product:', error.message);
    });
}

function updateProduct(dataUpdate){
    const product = JSON.stringify(dataUpdate);
    fetch('/product/update',{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
        body:`product=${product}`,
    })
    .then((response) => response.json())
    .then(data => {
        if(data){
            showNotification("Cập nhật thông tin sản phẩm thành công!");
            console.log("Update product successfully.");
            getProductList();
        }
        else{
            showNotification("Cập nhật thông tin sản phẩm thất bại!");
            console.log("Update product failed.");
        }     
    })
    .catch (error => {
        console.error('Error updating product:', error.message);
    });
}

