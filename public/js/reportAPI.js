function getOrderByTime(start,end){
    fetch(`/order/${start}/${end}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(orders => {
        totalProduct = 0;
        revenue = 0;
        var cost = 0;
        if(orders){
            console.log("Lấy dữ liệu đơn hàng thành công.")
            console.log(orders)
            totalOrder = orders.length;
            

            var data = '';
            orders.forEach(order => {
                revenue += order.totalAmount;

                data +=
                    `<tr>` +
                        `<td>${order.saleId ? order.saleId.fullName : "<b>Nhân Viên Nghỉ</b>"}</td>`+
                        `<td>${order.customerId.fullName}<br>${order.customerId.phoneNumber}<br>${order.customerId.address}</td>`+
                        `<td>`+
                                `<ul>`;
                order.products.forEach(product =>{
                    if(product.productId){
                        totalProduct += product.quantity;
                        cost += product.productId.importPrice* product.quantity;
                        data += `<li><b>Tên Sản phẩm</b> ${product.productId.productName} <br> <b>Số lượng</b> : ${product.quantity} <br> <b>Tổng</b> : ${formatPrice(product.totalPrice)} </li>`+
                                `<hr>`;
                    }
                    else{
                        data += "<b>Ngừng kinh doanh</b><hr>";
                    }
                })
                data +=     `</ul>`+
                        `</td>`+
                        `<td>${moment(order.purchaseDate).format("DD/MM/YYYY")}</td>`+
                        `<td>${formatPrice(order.totalAmount)}</td>`+
                    `</tr > `;
            });
            $('#listOrder').html(data);
            
            var dataOverviewReport = `<tr>`+
                                        `<td>${totalOrder}</td>`+
                                        `<td>${totalProduct}</td>`+
                                        `<td>${formatPrice(revenue)}</td>`+
                                        `${role == "ADMIN" ? `<td>${formatPrice(revenue - cost)}</td> `: ""}`+
                                    `</tr>`;

            $('#overviewReport').html(dataOverviewReport);
        }else{
            console.log("Lấy dữ liệu đơn hàng thất bại.")
        }
    })
    .catch (error => {
        console.error('Error getting list of orders by time :', error.message);
    });
}