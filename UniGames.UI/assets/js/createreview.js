// Uses the URL to get the specific ID
var urlParams = new URLSearchParams(window.location.search);
// Gets the ID and stores it in a variable
var gameID = urlParams.get('id');
// Logs the gameID
console.log('Game ID:', gameID, "successfully transferred");


function createReview(event){
    event.preventDefault();

    const activeTimeout = timeoutStatus();

    const formData = new FormData(document.getElementById("createreview"));

    const reviewTitle = formData.get("ReviewTitle");
    const reviewDesc = formData.get("ReviewDescription");
    const score = formData.get("Score");
    // const username = formData.get('Username');
    // const password = formData.get('Userpassword');
    // const password2 = formData.get('Userpassword2');

    const titleError = document.getElementById('titleerror');
    const descriptionError = document.getElementById('descriptionerror');
    const scoreError = document.getElementById('scoreerror');
    // const usernameError = document.getElementById('usernameerror');
    // const passwordError = document.getElementById('passworderror');
    // const passwordError2 = document.getElementById('passworderror2');

    const numberValue = parseFloat(score);
    // Reset error messages before validation
    titleError.innerHTML = '';
    descriptionError.innerHTML = '';
    scoreError.innerHTML = '';
    // usernameError.innerHTML = '';
    // passwordError.innerHTML = '';
    // passwordError2.innerHTML = '';
    let curFail = false;

    // Checks to see if the title contains no text
    if (reviewTitle === '' || reviewTitle === null) {
        event.preventDefault();
        titleError.innerHTML = 'Your review needs a title';
        curFail = true;
    }
    // Checks to see if the description contains no text
    if (reviewDesc === '' || reviewDesc === null) {
        event.preventDefault();
        descriptionError.innerHTML = 'You need to provide a description';
        curFail = true;
    // Checks if the length of the description is less than 20 or higher than 500
    } else if (reviewDesc.length < 20 || reviewDesc.length > 500) {
        event.preventDefault();
        descriptionError.innerHTML = 'A description needs to be between 20 - 500 characters';
        curFail = true;
    }
    // Checks to see if the number is valid or less than 0 or bigger than 100
    if (isNaN(numberValue) || numberValue < 0 || numberValue > 100) {
        event.preventDefault();
        scoreError.innerHTML = 'Your score needs to be between 0 and 100';
        curFail = true;
    }else{
        scoreError.innerHTML = (null);
    }
    // // Checks to see if the username is contains no text
    // if (username === '' || username === null) {
    //     event.preventDefault();
    //     usernameError.innerHTML = 'You must enter your username';
    //     curFail = true;
    // }
    // // Checks to see if the password contains no text
    // if (password === '' || password === null){
    //     if (activeTimeout){
    //         passwordError.innerHTML = 'Please Wait For The Cooldown To Expire';
    //     }else{
    //         passwordError.innerHTML = 'You must enter your account\'s password';
    //         curFail = true;
    //     }
        
    // }else{
    //     passwordError.innerHTML = '';
    // }

    // if (password !== password2){
    //     const error_message = document.getElementById('passworderror2');
            
    //     error_message.innerHTML = "Passwords do not match, please try again";
    //     passwordTimeout();
    //     return;
    // }
    // if (password === password2){
    //     const error_message = document.getElementById('passworderror2');
    //     error_message.innerHTML = "";
        
    // }

        
    if (curFail){
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
            const userID = data.userID;
            console.log(userID);
            // Get Username and Password
            const reviewData = {
                ReviewTitle: reviewTitle,
                ReviewDescription: reviewDesc,
                Score: score, 
                UserID: userID,
                GameID: gameID,
            };

            fetch('http://localhost:5116/review', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify(reviewData),
            })
            .then(response => {
                if (response.status === 200){
                    response.json()
                } else if (response.status === 400){
                    return Promise.resolve(response.json());
                }
            })
            .then(data => {
                console.log("API Response: ", data)
                //window.location.href = "assets/inc/success.html?success=1";
                if ('status' in data){
                    //window.location.href = "assets/inc/success.html?success=1";
                    if (data.status === 400){
                        console.log(data.errors);
                        console.log(data.errors.ReviewDescription[0]);
                        customPopup(data.errors.ReviewDescription[0]);
                        //if (data.errors.)
                        //customPopup(data.errors.ReviewDescription[0])
                        return;
                    }
                    else{
                        console.log("Unexpected Status/Error: ", data.status);
                    }
                }else{
                    console.log("No status returned, assuming success.");
                    window.location.href = "assets/inc/success.html?success=1";
                    // Invokes the modifySuccess() function and adds the message to it
                    //modifySuccess("Your review has been added, thank you!");
                }
            })

            .catch(error => {
                console.error("Error:", error);
            });
    })
    .catch(error => {
        console.error(error);
    })
    
    
            

           
}

loginStatus();
document.getElementById("createreview").addEventListener("submit", createReview);