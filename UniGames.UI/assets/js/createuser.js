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
        }
         response.json()
    })
        
    .then(responseData => {
        console.log('API Response: ', responseData)
    })
    .catch(error=> {
        console.error('Error: ', error);
        if(error.includes("error : 400")){
            errorhandling.innerHTML = ("Username is taken");
        }
    });
}


document.getElementById("SignUp").addEventListener('submit', CreateUsers);
