// Uses the URL to get the specific ID
var urlParams = new URLSearchParams(window.location.search);
// Gets the ID and stores it in a variable
var reviewID = urlParams.get('id');
// Logs the gameID
console.log('Review:', reviewID, "successfully transferred");


function deleteReview(event){
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
        event.preventDefault();
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

    // Get UserID by Username
    fetch(`http://localhost:5116/user/${username}/${password}`)
        .then(response => {
            if (response.status === 200){
                console.log("User authenticated");

                return response.json();
            } else if (response.status === 404){
                // User is not found
                window.location.href = "error.html?error=2";
            } else if (response.status === 401){
                // Password is incorrect
                window.location.href = "error.html?error=1";
            } else{
                console.error("error", response.status);
            }
        })
        .then(data => {
            const userID = data.userId;
            fetch(`http://localhost:5116/deletereview/${userID}/${reviewID}`, {
                // Chooses the method used
                method: "DELETE",
                // Chooses the format of the content
                headers: {
                    "Content-Type": "application/json",
                },
                // Converts the data to a string
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log("api response: ", data)
                modifySuccess("You have successfully deleted your review!");
            })
            .catch(error => {
                console.error(error);
                window.location.href = "error.html";
            });

        })
        .catch(error => {
            console.error("Error:", error);
        });

           
}

loginStatus();
document.getElementById("deletereview").addEventListener("submit", deleteReview);