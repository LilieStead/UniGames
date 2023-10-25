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

    const data = {
        Userfname: FirstName,
        Userlname: LastName,
        Username: UserName,
        Useremail: Email,
        Userphone: Phone,
        Userdob: userdob,
        Userpassword: Password,
    };


    fetch('http://localhost:5116/CreateUsers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        console.log('API Response: ', responseData)
    })
    .catch(error=> {
        console.error('Error: ', error);
    });
}


document.getElementById("SignUp").addEventListener('submit', CreateUsers);
