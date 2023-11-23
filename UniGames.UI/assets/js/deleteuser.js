
// Creates a new function that looks for an event
let noReturn = true;
function deleteUser(){
    // Prevents the event from occuring if data is not present
  
    const activeTimeout = timeoutStatus();

    // Looks for the ID of the form and creates Form Data using the FormData method
    const formData = new FormData(document.getElementById("deleteuser"));

    // Gets the username and password from the form data
    //const username = formData.get('Username');
    const password = formData.get('Userpassword');
    const password2 = formData.get('Userpassword2');

    //const usernameError = document.getElementById('usernameerror');
    const passwordError = document.getElementById('passworderror');
    const passwordError2 = document.getElementById('passworderror2');
    //usernameError.innerHTML = '';
    passwordError.innerHTML = '';
    passwordError2.innerHTML = '';

    console.log("We making it back?");
    // Creates a false flag to stop progression if true
    let blankFields = false;

    // Checks to see if the password contains no text
    if (password === '' || password === null){
        if (activeTimeout){
            passwordError.innerHTML = 'Please Wait For The Cooldown To Expire';
            
        }else{
            passwordError.innerHTML = 'You must enter your account\'s password';
            blankFields = true;
            return;

        }
    }

    if (password !== password2){
        const error_message = document.getElementById('passworderror2');
            
        error_message.innerHTML = "Passwords do not match, please try again";
        blankFields = true;
        passwordTimeout();
        return;
    }
    if (password === password2 && password != null){
        const error_message = document.getElementById('passworderror2');
        error_message.innerHTML = "";
        
    }

    if (blankFields){
        
        return;
        
    }


    const userIDSess = sessionStorage.getItem('authToken');
    const userIDLocal = localStorage.getItem('authTokenLocal');
    const authToken = JSON.parse(userIDLocal);
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
             // Creates a variable which stores the username from the token
            const userName = data.username;
            // Uses the delete endpoint with the username from the database
            fetch(`http://localhost:5116/delete/${userName}/${password}`, {
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
                    // If the response status code is equal to 400 then
                } else if (response.status === 401){
                    return Promise.reject("Error: 401");
                } else if (response.status === 400){
                    return Promise.reject("Error: 400");
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
                console.log("Success");
                sessionStorage.removeItem('authToken');
                localStorage.removeItem('authTokenLocal');

                const successMessage = "Success! Your account has been deleted.";

                // Due to the login functionality being developed, this entire section for the success
                // may change due to the circumstances around directing out of the page but this will
                // be solved quickly

                // The message can also be typed manually, 
                // just like this: modifySuccess("This was a great success!")
                // Invokes the modifySuccess() function and adds the message to it
                modifySuccess(successMessage);

            })
            .catch(error => {
                // Logs the error to the console
                console.error("Error:", error);
                // Sends the user to the default error page
                //indow.location.href = "error.html?error=default";
                if (error.includes("Error: 401")){
                    customPopup("Password does not match user");
                } else if (error.includes("Error: 400")){
                    customPopup("Please delete the games you have made before deleting your account");
                }
            });
            
        });
        // Creates a variable which stores the username from the token
        const userName = data.username;
        // Uses the delete endpoint with the username from the database
        fetch(`http://localhost:5116/delete/${userName}/${password}`, {
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
                // If the response status code is equal to 400 then
            } else if (response.status === 401){
                return Promise.reject("Error: 401");
            } else if (response.status === 400){
                return Promise.reject("Error: 400");
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
            console.log("Success");
            sessionStorage.removeItem('authToken');
            localStorage.removeItem('authTokenLocal');
            
            const successMessage = "Success! Your account has been deleted.";

            // Due to the login functionality being developed, this entire section for the success
            // may change due to the circumstances around directing out of the page but this will
            // be solved quickly

            // The message can also be typed manually, 
            // just like this: modifySuccess("This was a great success!")
            // Invokes the modifySuccess() function and adds the message to it
            modifySuccess(successMessage);
            
        })
        .catch(error => {
            // Logs the error to the console
            console.error("Error:", error);
            // Sends the user to the default error page
            //indow.location.href = "error.html?error=default";
            if (error.includes("Error: 401")){
                customPopup("Password does not match user");
            } else if (error.includes("Error: 400")){
                customPopup("Please delete the games you have made before deleting your account");
            }
        });
    })
    .catch(error => {
        console.error(error);
    })
    
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
loginStatus();
document.getElementById("deleteuser").addEventListener("keydown", getEnterKey);
