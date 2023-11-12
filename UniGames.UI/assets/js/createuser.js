function CreateUsers(event){
    event.preventDefault();


    const formData = new FormData(document.getElementById("SignUp"));

    const FirstName = formData.get('FirstName');
    const LastName = formData.get('LastName');
    const UserName = formData.get('UserName');
    const Email = formData.get('Email');
    const Phone = formData.get('Phone');
    const userdob = formData.get('userdob');
    const Password = formData.get('Password');

    // email format
    var emailformat = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

    // getting all error p tags

    const firstnameerror = document.getElementById("firstnameerror");
    const lastnameerror = document.getElementById("lastnameerror");
    const usernameerror = document.getElementById("usernameerror");
    const emailerror = document.getElementById("emailerror");
    const doberror = document.getElementById("doberror");
    const passworderror = document.getElementById("passworderror");
    const phoneerror = document.getElementById("phoneerror");

    let nopass = false;
    
    if (FirstName  == '' || FirstName  == null){
        firstnameerror.innerHTML = ("you need to enter a you first name");
        nopass = true;
        event.preventDefault();
        
    }else {
        firstnameerror.innerHTML = (null);
    }
    if (LastName == '' || LastName == null){
        lastnameerror.innerHTML = ("You need to enter you last name");
        nopass = true;
        event.preventDefault();
    }else{
        lastnameerror.innerHTML = (null);
    }
    if (UserName == '' || UserName == null){
        usernameerror.innerHTML = ("you need to enter a username");
        nopass = true;
        event.preventDefault();
    }else{
        usernameerror.innerHTML = null
    }
    if (Email == '' || Email == null){
        emailerror.innerHTML = ("You need to enter you email");
        nopass = true;
        event.preventDefault();
    }else if (!Email.match(emailformat)){
        emailerror.innerHTML = ("you need to enter a valid email");
        nopass = true;
        event.preventDefault();
    }else{
        emailerror.innerHTML = (null);
    }
    if (userdob == '' || userdob == null){
        doberror.innerHTML = ("you need to enter your date of birth");
        nopass = true;
        event.preventDefault();
    }else{
        doberror.innerHTML = null;
    }
    if (Password == '' || Password == null){
        passworderror.innerHTML = ("you need to enter a password");
        nopass = true;
        event.preventDefault();
    }else if ( Password.length < 8  || Password.length > 50){
        passworderror.innerHTML = ("your password needs to be in between 8 and 50 characters");
        nopass = true;
        event.preventDefault();
    }else if ( Password != null || Password != ''){
        passworderror.innerHTML = null;
    }
    if (Phone == null || Phone == ''){
        phoneerror.innerHTML = null;
    }
    else if (Phone.length > 11 || Phone.length < 11){

        phoneerror.innerHTML = ("you phone number needs to be 11 numbers");
        nopass = true;
        event.preventDefault();
    }else {
        phoneerror.innerHTML = null;
    }
    
    if (nopass){

    const Password2 = formData.get('Password2');

    // Other errors go here
    const passwordError = document.getElementById('passworderror');

    let hasErrors = false;

    if (Password === '' || Password === null){
        passwordError.innerHTML = 'You must enter your new password';
        hasErrors = true;
    }

    if (Password !== Password2){
        const error_message = document.getElementById('passworderror2');
        error_message.innerHTML = "Passwords do not match, please try again"
        return;
    }

    if (Password === Password){
        const error_message = document.getElementById('passworderror2');
        error_message.innerHTML = '';
    }

    if (hasErrors){
        return;
    }
    const data = {
        Userfname: FirstName,
        Userlname: LastName,
        Username: UserName,
        Useremail: Email,
        Userphone: Phone,
        Userdob: userdob,
        Userpassword: Password,
    };


    fetch('http://localhost:5116/User', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if(response.status === 400){
            console.log("username exists");
            return Promise.reject("error : 400, Username is taken");
        }else if(response.status === 409){
            console.log("Email is already being used");
            return Promise.reject("error : 409, Email is already being used");
        }
         response.json()
    })
        
    .then(responseData => {
        console.log('API Response: ', responseData)
        window.location.href = "assets/inc/success.html?success=7";
    })
    .catch(error=> {
        console.error('Error: ', error);
        if(error.includes("error : 400")){
            customPopup("Username has already been taken please find another one.");
        }else if (error.includes("error : 409")){{
            customPopup("Current email is already being used");
        }}
    });
}


document.getElementById("SignUp").addEventListener('submit', CreateUsers);
