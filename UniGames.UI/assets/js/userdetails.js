function validateUser(){

    
    const formData = new FormData(document.getElementById('editdetails'));

    const usernameerror = document.getElementById("usernameerror");
    const doberror = document.getElementById("userdoberror");
    const phoneerror = document.getElementById("userphoneerror");
    const firstnameerror = document.getElementById("userfirstnameerror");
    const lastnameerror = document.getElementById("userlastnameerror");
    const emailerror = document.getElementById("useremailerror");

    let blankFields = false;


    // USERNAME 
    const username = formData.get("Username");
    if (username == null || username == ""){
        usernameerror.innerText = ("You need to enter a username");
        blankFields = true;
    }else if (username.length >= 50){
        usernameerror.innerText = ("Your username can not be more than 50 characters");
        blankFields = true;
    }else{
        usernameerror.innerText =  (null);
    }


    // DOB
    const userdob = formData.get("dob");
    if (userdob == null || userdob == ""){
        doberror.innerText = ("You need to enter your date of birth");
        blankFields = true;
    }else {
        doberror.innerText = (null);
    }

    // PHONE
    const phone = formData.get("phone");
    if (phone == null || phone == ""){
        phoneerror.innerText = (null);
    }else if (phone.length >= 12 || phone.length <= 10){
        phoneerror.innerText = ("You phone number needs to be 11 numbers");
        blankFields = true ;
    }else{
        phoneerror.innerText = (null);
    }

    const email = formData.get("email");
    var emailformat = "^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$"
    if (email == null || email == ""){
        emailerror.innerText = ("You need to enter your email");
        blankFields = true ;
    }else if (!email.match(emailformat)){
        emailerror.innerText = ("You need to enter a valid email");
        blankFields = true ;
    }else {
        emailerror.innerText = (null);
    }

    const firstname = formData.get("firstname");
    if (firstname == null || firstname == ""){
        firstnameerror.innerText = ("you need to enter your first name");
        blankFields = true ;
    } else{
        firstnameerror.innerText = (null);
    }

    const lastname = formData.get("lastname");
    if (lastname == null || lastname == ""){
        lastnameerror.innerText = ("You need to enter your first name");
        blankFields = true ;
    }else{
        lastnameerror.innerText = (null);
    }

    const dateObject = new Date(userdob);
    const dob = dateObject.toISOString();


    if (blankFields){
        return;
    }

    const userIDSess = sessionStorage.getItem('authToken');
    const userIDLocal = localStorage.getItem('authTokenLocal');
    const authToken = JSON.parse(userIDLocal);
    //console.log(authToken.value);
    var idType;

    if (userIDSess){
        idType = "session";
    } else{
        idType = "local";
    }

    const apiURL = idType === 'session'
    ? `http://localhost:5116/user/decodeToken?jwtToken=${userIDSess}`
    : `http://localhost:5116/user/decodeToken?jwtToken=${authToken.value}`;

    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const userName = data.username;

        const userdata = {
            Userfname: firstname,
            Userlname: lastname,
            Useremail: email,
            Userphone: phone,
            Userdob: userdob,
            Username: username
        };
        fetch(`http://localhost:5116/EditUser/${userName}` , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userdata),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            modifySuccess("You have successfully updated your details!");
        })
        .catch(error => {
            console.error(error);
        })
    })
    .catch(error => {
        console.error(error);
    })








}
loginStatus();