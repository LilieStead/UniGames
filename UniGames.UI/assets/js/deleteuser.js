// Creates a new function that looks for an event
function deleteUser(event){
    // Prevents the event from occuring if data is not present
    event.preventDefault();
    // Looks for the ID of the form and creates Form Data using the FormData method
    const formData = new FormData(document.getElementById("deleteuser"));

    // Gets the username and password from the form data
    const username = formData.get('Username');
    const password = formData.get('Userpassword');

    const usernameerror = document.getElementById('usernameerror');
    const passworderror = document.getElementById('passworderror');
    usernameerror.innerHTML = '';
    passworderror.innerHTML = '';

    // Creates a false flag to stop progression if true
    let blankFields = false;
    // Checks to see if the username is contains no text
    if (username === '' || username === null) {
        event.preventDefault();
        usernameerror.innerHTML = 'You must enter your username';
        blankFields = true;
    }
    // Checks to see if the password contains no text
    if (password === '' || password === null){
        event.preventDefault();
        passworderror.innerHTML = 'You must enter your account\'s password';
        blankFields = true;
    }

    if (blankFields){
        return; // Stops progression to the fetch -- Allows for separate error messages
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
            // Logs the data
            console.log(data);
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
                    // If the response status code is equal to 400 then
                } else if (response.status === 400) {
                    // Log to the console that the user has created reviews
                    console.log("User Has Previously Created Reviews");
                    // Returns a rejection for the provided reason
                    return Promise.reject("Error: 400 - User Has Previously Created Reviews, Denied From Deleting");
                } else {
                    // Returns an error in the console based on the response status
                    console.error("error", response.status);
                }
            })
            .then(data => {
                // Logs the API Response and the data to the console
                console.log("API Response: ", data);
                // Sends the user to a success page to tell them their account has been deleted
                window.location.href = "assets/inc/success.html?success=2";
                
            })
            .catch(error => {
                if (error.includes("Error: 400")) {
                    // When reviews are present, present a popup to tell the user
                    // They need to delete existing reviews to delete their account
                    customPopup("You have previously created reviews, please remove all reviews and then try again")
                } else {
                    // Logs the error to the console
                    console.error("Error:", error);
                    // Sends the user to the default error page
                    window.location.href = "error.html?error=default";
                }
            });
            
        })
        .catch(error => {
            console.error("Error:", error);
            if (error.includes("Error: 401")){
                //passworderror.innerHTML = "Password is incorrect, please try again or reset your password first";
                customPopup("Password is incorrect, please try again or reset your password first");
            } else if (error.includes("Error: 404")){
                //usernameerror.innerHTML = "Username does not exist in the database, please try again";
                customPopup("Username does not exist in the database, please try again");
            }
        });

           
}


document.getElementById("deleteuser").addEventListener("submit", deleteUser);