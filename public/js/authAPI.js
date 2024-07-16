function getProfile(email){
    fetch(`/profile/${email}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
    })
    .then((response) => response.json())
    .then(user => {
        console.log('Get the user successfully');
        $('#fullName').val(user.fullName);
        $('#email').val(user.email);
        $('#birthday').val(user.birthday)
        if(user.gender == "MALE"){
            $('#genderMale').prop('checked', true);
        }else if(user.gender == "FEMALE"){
            $('#genderFemale').prop('checked', true);
        }
        else{
            $('#genderMale').prop('checked', false);
            $('#genderFemale').prop('checked', false);
        }
        $('#role').val(user.role);
    })
    .catch (error => {
        console.error('Error getting user:', error.message);
    });
}

function updateProfile(dataUpdate){
    const user = JSON.stringify(dataUpdate);
    const email = user.email;

    fetch(`/profile/${email}`,{
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


function changePassword(newPassword){
    fetch('/changePassword',{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfToken,
        },
        body:`password=${newPassword}`,
    })
    .then((response) => response.json())
    .then(data => {
        if(data){
            showNotification("Đổi mật khẩu thành công!");
            console.log("Change password successfully.");
            window.location.href = "/";
        }
        else{
            showNotification("Đổi mật khẩu thất bại!");
            console.log("Change password failed.");
        }     
    })
    .catch (error => {
        console.error('Error changing lock status of user:', error.message);
    });
}