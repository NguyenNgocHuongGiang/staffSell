
function createUser(user){
    fetch('/user/create',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
        body:`email=${user.email}&fullname=${user.fullname}`,
    })
    .then((response) => response.json())
    .then(data => {
        if(data.code == 1){
            getUserList();
            showNotification("Tạo người dùng mới thành công!");
        }
        else if(data.code == 0){
            showAlert(data.message);
        }else{
            showAlert(data.message);
        }
        
    })
    .catch (error => {
        console.error('Error creating user:', error.message);
    });
}

function getUserList(){
    fetch('/user',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(list => {
        console.log('Get the list of users successfully');
        var data = '';
        list.splice(0,1);
        list.forEach(user => {
            data += 
            `<tr>`+
                `<td><img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" srcset="" width="35px" height="35px" style="border-radius: 50%;"> </td>`+
                `<td>${user.fullName}</td>`+
                `<td id="email">${user.email}</td>`+
                `<td id="activeStatus" style="color: ${user.isActive ? "blue" : "red"}">${user.isActive ? "Actived" : "Not actived"}</td>`+
                `<td><label class="switch"  ><input type="checkbox" ${user.isLock ? "checked" : ""} onchange="updateLock('${user.email}',this)">`+
                `<span class="slider round"></span></label></td>`+
                `<td>${user.role}</td>`+
                // `<td>`+moment(user.createdAy).format("DD/MM/YYYY")+`</td>`+
                //`<td><button class="btn btn-secondary"><i class="fa fa-list" aria-hidden="true"></i></button></td>`+
                `<td>`+
                `    <button class="btn btn-warning"><i class="fa fa-retweet" aria-hidden="true" id ="resendMailButton"></i></button>`+
                `    <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editStaff" id="editButton"><i class="fa fa-edit" aria-hidden="true" ></i></button>`+
                `    <button class="btn btn-danger" data-target="#deleteModal" data-toggle="modal" id ="deleteButton"><i class="fa fa-trash" aria-hidden="true"></i></button>`+
                `</td>`+
            `</tr>`;
        });
        $('#listUser').html(data);
    })
    .catch (error => {
        console.error('Error getting list of user:', error.message);
    });
}

function getOneUserByEmail(email){
    fetch(`/user/${email}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(user => {
        console.log('Get the user successfully');
        $('#editFullname').val(user.fullName);
        $('#editEmail').val(user.email);
        $('#editBirthday').val(user.birthday)
        if(user.isActive){
            $('#editIsActive').val('true');
        }else{
            $('#editIsActive').val('false');
        }
        if(user.gender == "MALE"){
            $('#editGenderMale').prop('checked', true);
        }else if(user.gender == "FEMALE"){
            $('#editGenderFemale').prop('checked', true);
        }
        else{
            $('#editGenderMale').prop('checked', false);
            $('#editGenderFemale').prop('checked', false);
        }
        
        if(user.isLock){
            $('#editIsLock').prop('checked', true)
        }else{
            $('#editIsLock').prop('checked', false)
        }
        if(user.isFirstLogin){
            $('#editIsFirstLogin').prop('checked', true)
        }else{
            $('#editIsFirstLogin').prop('checked', false)
        }

        $('#editRole').val(user.role);
    })
    .catch (error => {
        console.error('Error getting user:', error.message);
    });
}


function deleteUser(){
    var email = $('#emailDelete').val();
    fetch(`/user/delete?email=${email}&`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(message => {
        console.log(message)
        showNotification("Xóa người dùng thành công!");
        getUserList();
    })
    .catch (error => {
        console.error('Error getting list of user:', error.message);
    });
}


function updateUser(dataUpdate){
    const user = JSON.stringify(dataUpdate);
    fetch('/user/update',{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
        body:`user=${user}`,
    })
    .then((response) => response.json())
    .then(data => {
        if(data){
            showNotification("Cập nhật thông tin người dùng thành công!");
            console.log("Update user successfully.");
            getUserList();
        }
        else{
            showNotification("Cập nhật thông tin người dùng thất bại!");
            console.log("Update user failed.");
        }     
    })
    .catch (error => {
        console.error('Error updating user:', error.message);
    });
}


function changeLockStatus(email,lockStatus){
    fetch('/user/changeLock',{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
        body:`email=${email}&lockStatus=${lockStatus}`,
    })
    .then((response) => response.json())
    .then(data => {
        if(data){
            showNotification("Thay dổi trạng thái khóa thành công!");
            console.log("Change lock status successfully.");
        }
        else{
            showNotification("Thay đổi trạng thái khóa thất bại!");
            console.log("Change lock status failed.");
        }     
    })
    .catch (error => {
        console.error('Error changing lock status of user:', error.message);
    });
}

function resendMail(email){
    fetch(`/user/resend`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
        body:`email=${email}`,
    })
    .then((response) => response.json())
    .then(data => {
        if(data){
            showNotification("Đã gửi lại mail thành công!");
            console.log("Resend email successfully.");
        }
        else{
            showNotification("Gửi lại mail thất bại!");
            console.log("Resend email failed.");
        }
    })
    .catch (error => {
        console.error('Error resending mail:', error.message);
    });
}