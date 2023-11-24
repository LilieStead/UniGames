function showPassword(){
    var password = document.getElementById('password');
    if (password.type === "password"){
        password.type = "text";
    } else{
        password.type = "password";
    }
}

function showSecondPassword(){
    var password2 = document.getElementById('password2');
    if (password2.type === "password"){
        password2.type = "text";
    } else{
        password2.type = "password";
    }
}