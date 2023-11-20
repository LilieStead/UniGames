localStorage.removeItem('authTokenLocal');
function userLogin(event){
    event.preventDefault();
    const formData = new FormData(document.getElementById("loginform"));

    const username = formData.get('Username');
    const userEmail = formData.get('Useremail');
    const userPassword = formData.get('Userpassword');

    const usernameError = document.getElementById('usernameerror');
    const emailError = document.getElementById('useremailerror');
    const passwordError = document.getElementById('passworderror');

    // Create an error flag
    let blankFields = false;

    // Validation checks
    if (username === '' || username === null) {
        usernameError.textContent = 'You must enter your username';
        blankFields = true;
    } else{
        usernameError.textContent = '';
    }

    if (userEmail === '' || userEmail === null) {
        emailError.textContent = 'You must enter your email address';
        blankFields = true;
    } else{
        emailError.textContent = '';
    }

    if (userPassword === '' || userPassword === null){
        passwordError.textContent = 'You must enter your password';
        blankFields = true;
    } else{
        passwordError.textContent = '';
    }

    if (blankFields){
        return;
    }
    
    const data = {
        Useremail: userEmail,
        Username: username,
        Userpassword: userPassword
    }

    fetch(`http://localhost:5116/user/${username}/${userPassword}`)
        .then(response => {
            // If the username and password match then
            if (response.status === 200){
                // Log to the console that the user has been authenticated
                console.log("Username and password authenticated");
                // Return the response
                return response.json();
                // If the username is not found then
            } else if (response.status === 404){
                // Sends to an error page where it tells the user the username is not found 
                //window.location.href = "error.html?error=2";
                //usernameerror.innerHTML = "Username does not exist in the database, please try again"
                return Promise.reject('Error: 404 - Username does not exist in the database');
            }
            else if (response.status === 401){
                // Sends to an error page where it tells the user the password is incorrect
                //window.location.href = "error.html?error=1";
                //passworderror.innerHTML = "Password is incorrect, please try again or reset your password first";
                return Promise.reject('Error: 401 - Password for this username is incorrect');
                
            }
            else{
                // Logs an error to the console
                console.error("error", response.status);
                // Popup to give an error to the userZ
                return customPopup("An unexpected error has occurred, please try again in a moment.");
            }
        })
        .then(data => {
            //console.log(data);
            const actEmail = data.user.useremail;
            console.log(data);
            console.log(data.user.useremail);
            if (actEmail !== userEmail){
                console.log("OH NO BOY");
                customPopup("Your email address does not match database records, please try again");
                return;
            } else{
                
                const authToken = data.token;

                sessionStorage.setItem('authToken', authToken);
                if (stayLogged.checked){
                    savePreference();
                }

                window.location.href = "home.html";
            }

            

        })
        .catch(error => {
            console.log(error);
            if (error.includes('Error: 404')){
                customPopup("Username is invalid");
            } else if (error.includes('Error: 401')){
                customPopup("Password is incorrect");
            }
        })
}

var stayLogged = document.getElementById('stayLoggedIn');
loginStatus();
document.getElementById("loginform").addEventListener("submit", userLogin);