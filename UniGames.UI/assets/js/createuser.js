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
    
    const errorhandling = document.getElementById("error-handling");
    errorhandling.innerHTML = (null);

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
