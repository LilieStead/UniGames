// Function to reset the user password
function resetPassword(){
    
    const activeTimeout = timeoutStatus();


    // Use the built-in FormData method to get the form data
    const formDataUser = new FormData(document.getElementById('resetpassform'));

    // Get all of the form data and store them to variables -- Const so they cannot be changed
    const userEmail = formDataUser.get('Useremail');
    const userPhone = formDataUser.get('Userphone');
    const newPassActual = formDataUser.get('Userpassword');
    const newPass2 = formDataUser.get('UserPasswordAgain');


    const emailError = document.getElementById('useremailerror');
    const passwordError = document.getElementById('passworderror');
    const phoneError = document.getElementById('userphoneerror');
    phoneError.innerHTML = '';

    // Create an error flag
    let hasErrors = false;

    // Validation checks

    if (userEmail === '' || userEmail === null) {
        emailError.textContent = 'You must enter your email address';
        hasErrors = true;
    } else{
        emailError.textContent = '';
    }

    if (newPassActual === '' || newPassActual === null){
        if (activeTimeout){
            passwordError.innerHTML = 'Please Wait For The Cooldown To Expire';
        } else{
            passwordError.innerHTML = 'You must enter your new password';
            hasErrors = true;
        }

        
    } else{
        passwordError.innerHTML = '';
    }


    if (newPassActual !== newPass2){
        const error_message = document.getElementById('passworderror2');
            
        error_message.innerHTML = "Passwords do not match, please try again";
        passwordTimeout();
        return;
    }
    if (newPassActual === newPass2){
        const error_message = document.getElementById('passworderror2');
        passwordTimeout();
        error_message.innerHTML = "";
        
    }

    if (hasErrors){
        return;
    }
    
    const data = {
        Userpassword: newPassActual
    }
    const inHTMLError = document.getElementById('error-handling');


    const userIDSess = sessionStorage.getItem('authToken');
    const userIDLocal = localStorage.getItem('authTokenLocal');
    const authToken = JSON.parse(userIDLocal);
    var idType;

    if (userIDSess){
        idType = "session";
    } else{
        idType = "local";
    }

    const apiTURL = idType === 'session'
    ? `http://localhost:5116/user/decodeToken?jwtToken=${userIDSess}`
    : `http://localhost:5116/user/decodeToken?jwtToken=${authToken.value}`;


    fetch(apiTURL)
    .then(response => response.json())
    .then(data => {
        // Logs the data
        console.log(data);
        // Creates a variable which stores the username from the token itself
        const userName = data.username;

        const newData = {
            Userpassword: newPassActual,
        };

        // Chooses the correct URL based on the condition of the phone number (if it is present in the data or not)
        // ? means it is present, : means it is not -- This chooses the API endpoint to use
        const apiURL = userPhone
        ? `http://localhost:5116/reset-password/${userName}/${userEmail}/${userPhone}`
        : `http://localhost:5116/reset-password/${userName}/${userEmail}`
        // Fetches the correct API endpoint needed
        fetch(apiURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        })
        .then(response => {
            var newvar = response.json();
            if (response.status === 200){
                console.log('User Authenticated');
                inHTMLError.textContent = '';
                return newvar;
            }
            else if (response.status === 400){
                console.log(newvar);
                return Promise.resolve(newvar);
            }
            else{
                console.log('Error: ', response.status);
                inHTMLError.textContent = 'An unexpected error occurred.';
            }
        })
        .then(data => {
            console.log('API Response: ', data);
            const errorMessages = [];
            if (data.length > 0){


                data.forEach((error) =>
                {
                    if (error.type === "Email"){
                        emailError.textContent = error.errorText;
                        console.log(data.errorText);
                        errorMessages.push(error.errorText);
                    } 
                    if (error.type === "Phone"){
                        phoneError.textContent = error.errorText;
                        //customPopup(error.errorText);
                        errorMessages.push(error.errorText);

                    }
                    console.log(error)
                });
                multi_Popup(errorMessages);

                return;
                //console.log
            } else{
                //window.location.href = "assets/inc/success.html?success=5";
                modifySuccess("You have successfully reset your password!");
            }
        
        })
        .catch(error => {
            console.error('Error: ', error);
            
        });

    })
    .catch(error => {
        console.error(error);
    })
}

loginStatus();