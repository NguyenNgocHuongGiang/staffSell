function getCustomerList(){
    fetch('/customer/list',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(list => {
        var data = ""
        list.forEach(customer => {
            data += 
            `<tr>`+
                `<td>${customer.fullName}</td>`+
                `<td>${customer.phoneNumber}</td>`+
                `<td>${customer.address}</td>`+
                `<td>`+
                    `<button class="btn btn-info">`+
                        `<a href="/customer/history/${customer._id}" style="color: inherit; text-decoration: none;">Chi tiết</a>`+
                    `</button>`+
                `</td>`+
            `</tr>`;
        });
        $('#listCustomer').html(data);
    })
    .catch (error => {
        console.error('Error getting list of customers:', error.message);
    });
}


function getCustomerByPhone(phone){
    fetch(`/customer/${phone}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(customer => {
        if(customer){
            isNewCustomer = false;
            $('#fullName').val(customer.fullName)        
            $('#address').val(customer.address)
            $('#customerId').val(customer._id)
        }else{
            isNewCustomer = true;
        }
    })
    .catch (error => {
        console.error('Error finding customer:', error.message);
    });
}

function createCustomer(customer){
    fetch(`/customer/create`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
        body:`customer=${JSON.stringify(customer)}`,
    })
    .then((response) => response.json())
    .then(customer => {
        if(customer){
            $('#customerId').val(customer._id)
            console.log("Tạo khách hàng mới thành công.");
            createBill();
        }else{
            console.log("Tạo khách hàng mới thất bại.");
        }
    })
    .catch (error => {
        console.error('Error creating customer:', error.message);
    });
}

function updateCustomer(customerUpdate){
    fetch(`/customer/update`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
        body:`customer=${JSON.stringify(customerUpdate)}`,
    })
    .then((response) => response.json())
    .then(customer => {
        if(customer){
            console.log("Cập nhật khách hàng thành công.")
        }else{
            console.log("Cập nhật khách hàng  thất bại.");
        }
    })
    .catch (error => {
        console.error('Error updating customer:', error.message);
    });
}


