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
    }else if (phone > 11 || phone < 11){
        phoneerror.innerText = ("You phone number needs to be 11 numbers");
        blankFields = true ;
    }else{
        phoneerror.innerText = (null);
    }

    const email = formData.get("email");
    var emailformat = "/^(?:[\w!#$%&'*+-/=?^`{|}~]+.)*[\w!#$%&'*+-/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5]).){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])]))$/";
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







}
document.getElementById('editdetails').addEventListener("submit", validateUser);
loginStatus();