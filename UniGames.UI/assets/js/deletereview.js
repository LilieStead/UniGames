// Uses the URL to get the specific ID
var urlParams = new URLSearchParams(window.location.search);
// Gets the ID and stores it in a variable
var reviewID = urlParams.get('id');
// Logs the gameID
console.log('Review:', reviewID, "successfully transferred");


function deleteReview() {

    const activeTimeout = timeoutStatus();


    const formData = new FormData(document.getElementById("deletereview"));

    const password = formData.get('Userpassword');
    const password2 = formData.get('Userpassword2');

    const passwordError = document.getElementById('passworderror');
    const passwordError2 = document.getElementById('passworderror2');

    passwordError.innerHTML = '';
    passwordError2.innerHTML = '';
    let curFail = false;


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
        curFail = true;
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
        .then(response => {
            if (response.status === 200){
                return response.json();
            } else if (response.status === 500){
                return modifyError("Failed to decode user token, please logout, log back in and try again");
            }
            else{
                console.error(response.status);
            }
        })
        .then(data => {
            const userID = data.userID;
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
                modifyError("Something went wrong, please try again :(");
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

loginStatus();
