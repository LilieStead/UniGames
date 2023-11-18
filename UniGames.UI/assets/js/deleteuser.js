
// Creates a new function that looks for an event
let noReturn = true;
function deleteUser(){
    // Prevents the event from occuring if data is not present
    //event.preventDefault();

    

    const activeTimeout = timeoutStatus();

    // Looks for the ID of the form and creates Form Data using the FormData method
    const formData = new FormData(document.getElementById("deleteuser"));

    // Gets the username and password from the form data
    const username = formData.get('Username');
    const password = formData.get('Userpassword');
    const password2 = formData.get('Userpassword2');

    const usernameError = document.getElementById('usernameerror');
    const passwordError = document.getElementById('passworderror');
    const passwordError2 = document.getElementById('passworderror2');
    usernameError.innerHTML = '';
    passwordError.innerHTML = '';
    passwordError2.innerHTML = '';
    console.log("We making it back?");
    // Creates a false flag to stop progression if true
    let blankFields = false;
    // Checks to see if the username is contains no text
    if (username === '' || username === null) {
        //event.preventDefault();
        modifyError("An unknown error occured");
        usernameError.innerHTML = 'You must enter your username';
        blankFields = true;
    }

    // Checks to see if the password contains no text
    if (password === '' || password === null){
        if (activeTimeout){
            passwordError.innerHTML = 'Please Wait For The Cooldown To Expire';
        }else{
            passwordError.innerHTML = 'You must enter your account\'s password';
            curFail = true;
            return;
        }
    }

    if (password !== password2){
        const error_message = document.getElementById('passworderror2');
            
        error_message.innerHTML = "Passwords do not match, please try again";
        passwordTimeout();
        return;
    }
    if (password === password2){
        const error_message = document.getElementById('passworderror2');
        error_message.innerHTML = "";
        
    }

    if (blankFields){
        
        return;
        
    }

    // Gets the user endpoint with the user's username and password
    fetch(`http://localhost:5116/user/${username}/${password}`)
    .then(response => {
        // If the username and password match then
        if (response.status === 200){
            // Log to the console that the user has been authenticated
            console.log("User authenticated");
            // Return the response
            return response.json();
            // If the username is not found then
        } else if (response.status === 404){
            // Sends to an error page where it tells the user the username is not found 
            
            return Promise.reject('Error: 404 - Username does not exist in the database');
        }
        else if (response.status === 401){
            // Sends to an error page where it tells the user the password is incorrect
            
            return Promise.reject('Error: 401 - Password for this username is incorrect');
            
        }
        else{
            // Logs an error to the console
            console.error("error", response.status);
            // Popup to give an error to the user
            return customPopup("An unexpected error has occurred, please try again in a moment.");
        }
    })
    .then(data => {
        const noRetDiv = document.getElementById('mainsize');
        const orignalContent = noRetDiv.innerHTML;
        noRetDiv.innerHTML = '';

        const content = `<div id="contenttitle"> <h1>ARE YOU SURE?</h1></div>
        <p class="delwarn">ARE YOU SURE YOU WANT TO DO THIS? <br> ALL REVIEWS YOU HAVE MADE WILL BE DELETED!</p>  
        <div class="flexcontainer"> 

        </div>`;
        noRetDiv.innerHTML = content;
        const warning = document.querySelector('.delwarn');
        warning.style.fontSize = '1.7em';

        const buttonContainer = noRetDiv.querySelector('.flexcontainer');
        

        const yesButton = document.createElement('button');
        yesButton.textContent = 'Yes';
        yesButton.id = 'YesButtonDelUser';
        yesButton.classList.add("DelUserConfirms");

        const noButton = document.createElement('button');
        noButton.textContent = 'No';
        noButton.id = 'NoButtonDelUser';
        noButton.classList.add("DelUserConfirms");

        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);

        noButton.addEventListener('click', function(){
            noReturn = false;
            noRetDiv.innerHTML = orignalContent;
            console.log("Returning");
            document.getElementById('crPRButton').style.display = 'none';
            document.getElementById("deleteuser").addEventListener("keydown", getEnterKey);
            
        });
        yesButton.addEventListener('click', function(){
            noReturn = true;
            // Creates a variable which stores the username from the database itself
            const userName = data.username;
            // Uses the delete endpoint with the username from the database
            fetch(`http://localhost:5116/delete/${userName}`, {
                // Chooses the method used
                method: "DELETE",
                // Chooses the format of the content
                headers: {
                    "Content-Type": "application/json",
                },
                // Converts the data to a string
                body: JSON.stringify(data),
            })
            .then(response => {
                // If the deletion was a success then
                if (response.status === 200) {
                    // Log in the console that the user can delete their account
                    console.log("User Is Able To Delete Account");
                    // Returns the response
                    return response.json();
                }
                else {
                    // Returns an error in the console based on the response status
                    console.error("error", response.status);
                }
            })
            .then(data => {
                // Logs the API Response and the data to the console
                console.log("API Response: ", data);
                // Sends the user to a success page to tell them their account has been deleted
                //window.location.href = "assets/inc/success.html?success=2";

                // The following code is experimental and requires testing   
                noRetDiv.innerHTML = '';

                const successMessage = "Success! Your account has been deleted.";

                // The message can also be typed manually, 
                // just like this: modifySuccess("This was a great success!")
                // Invokes the modifySuccess() function and adds the message to it
                modifySuccess(successMessage);

                
            })
            .catch(error => {
                // If statement is now irrelevant and will be deleted soon.
                if (error.includes("Error: 400")) {
                    // When reviews are present, present a popup to tell the user
                    // They need to delete existing reviews to delete their account
                    customPopup("You have previously created reviews, please remove all reviews and then try again")
                } else {
                    // Logs the error to the console
                    console.error("Error:", error);
                    // Sends the user to the default error page
                    modifyError("An unknown error occured");
                }
            });
            
        });
    })
    .catch(error => {
        console.error("Error:", error);
        if (error.includes("Error: 401")){
            //passworderror.innerHTML = "Password is incorrect, please try again or reset your password first";
            customPopup("Password is incorrect, please try again or reset your password first");
            document.getElementById('crPRButton').style.display = 'block';
            
        } else if (error.includes("Error: 404")){
            //usernameerror.innerHTML = "Username does not exist in the database, please try again";
            customPopup("Username does not exist in the database, please try again");
        }
    });
    


    

           
}

function getEnterKey(event){
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
        // Prevent the default behavior (e.g., form submission)
        event.preventDefault();

        // Programmatically trigger the form submission
        deleteUser();
    }
}

document.getElementById("deleteuser").addEventListener("keydown", getEnterKey);