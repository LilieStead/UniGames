// Uses the URL to get the specific ID
var urlParams = new URLSearchParams(window.location.search);
// Gets the ID and stores it in a variable
var reviewID = urlParams.get('id');
// Logs the gameID
console.log('Review:', reviewID, "successfully transferred");


function deleteReview(event) {
    event.preventDefault();

    const activeTimeout = timeoutStatus();


    const formData = new FormData(document.getElementById("deletereview"));
    const username = formData.get('Username');
    const password = formData.get('Userpassword');
    const password2 = formData.get('Userpassword2');

    const usernameError = document.getElementById('usernameerror');
    const passwordError = document.getElementById('passworderror');
    const passwordError2 = document.getElementById('passworderror2');

    usernameError.innerHTML = '';
    passwordError.innerHTML = '';
    passwordError2.innerHTML = '';
    let curFail = false;


    // Checks to see if the username is contains no text
    if (username === '' || username === null) {
        usernameError.innerHTML = 'You must enter your username';
        curFail = true;
    }
    // Checks to see if the password contains no text
    if (password === '' || password === null){
        if (activeTimeout){
            passwordError.innerHTML = 'Please Wait For The Cooldown To Expire';
        }else{
            passwordError.innerHTML = 'You must enter your account\'s password';
            curFail = true;
        }
        
    }else{
        passwordError.innerHTML = '';
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

    if (curFail){
        return;
    }

    let blankFields = false;


    if (blankFields) {
        return;
    }

    // Get UserID by Username
    fetch(`http://localhost:5116/user/${username}/${password}`)
        .then(response => {
            if (response.status === 200) {
                console.log("User authenticated");

                return response.json();
            } else if (response.status === 404) {
                // User is not found
                return Promise.reject("Error: 404-User is not found");
            } else if (response.status === 401) {
                // Password is incorrect
                return Promise.reject("Error: 401-Password is incorrect");
            } else {
                console.error("error", response.status);
            }
        })
        .then(data => {
            //Exrtracts the userID from the data that has been retrieved 
            const userID = data.userId;

            //Fetches review data by the reviewID
            fetch(`http://localhost:5116/review/${reviewID}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    //If the review is not found return error 404
                    else if (response.status === 404) {
                        return Promise.reject("Error: 404-Review not found");
                    }

                    else {
                        console.error(response.status);
                    }
                })
                .then(Data => {
                    //Checks if the username and password entered matches the account that made the review
                    fetch(`http://localhost:5116/deletereview/${userID}/${reviewID}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                        .then(response => {
                            if (response.status === 200) {
                                return response.json();
                            }
                            else if (response.status === 400) {
                                return Promise.reject("Error: 400-User did not make this review");
                            }
                            else {
                                return console.error("error: ", response.status);
                            }
                        })
                            

                        //Log the API response and redirect the user to success page 3
                        .then(data => {
                            console.log("api response: ", data)
                            modifySuccess("You have successfully deleted your review!");
                        })
                        //Error handling for a user deleting another users review
                        .catch(error => {
                            console.error(error);
                            if (error.includes("Error: 400")) {
                                customPopup("User did not make this review");
                            }
                        });
                    
                })
                //Error handling for a review that isn't found
                .catch(error => {
                    console.error("Error fetching review data:", error);
                    if (error.includes("Error: 404")) {
                        customPopup("Review Not Found");
                    }
                });
        })
        //Error handling for incorrect username and password
        .catch(error => {
            console.error("Error:", error);
            if (error.includes("Error: 404")) {
                customPopup("Username does not exist");

            } else if (error.includes("Error: 401")) {
                customPopup("Password is incorrect");
            }
        });
}
