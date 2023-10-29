// Creates a new function that looks for an event
function deleteUser(event){
    // Prevents the event from occuring if data is not present
    event.preventDefault();
    // Looks for the ID of the form and creates Form Data using the FormData method
    const formData = new FormData(document.getElementById("deleteuser"));

    // Gets the username and password from the form data
    const username = formData.get('Username');
    const password = formData.get('Userpassword');

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
                window.location.href = "error.html?error=2";
            }
            else if (response.status === 401){
                // Sends to an error page where it tells the user the password is incorrect
                window.location.href = "error.html?error=1";
            }
            else{
                // Logs an error to the console
                console.error("error", response.status);
                // Sendsthe user to an error page for unexpected errors
                window.location.href = "error.html?error=default";
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
                    return Promise.reject("User Has Previously Created Reviews, Denied From Deleting");
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
                if (error === "User Has Previously Created Reviews, Denied From Deleting") {
                    // When reviews are present, send the user to an error page to tell them
                    // They need to delete existing reviews to delete their account
                    window.location.href = "error.html?error=3";
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
        });

           
}


document.getElementById("deleteuser").addEventListener("submit", deleteUser);