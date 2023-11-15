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
    const username = formData.get('Username');
    const password = formData.get('Userpassword');
    const password2 = formData.get('Userpassword2');
    
    const titleError = document.getElementById('titleerror');
    const descriptionError = document.getElementById('descriptionerror');
    const scoreError = document.getElementById('scoreerror');
    const usernameError = document.getElementById('usernameerror');
    const passwordError = document.getElementById('passworderror');
    const passwordError2 = document.getElementById('passworderror2');

    const numberValue = parseFloat(score);
    // Reset error messages before validation
    titleError.innerHTML = '';
    descriptionError.innerHTML = '';
    scoreError.innerHTML = '';
    usernameError.innerHTML = '';
    passwordError.innerHTML = '';
    passwordError2.innerHTML = '';
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
    console.log(password);
    console.log(password2);
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
    // Get Username and Password
    fetch(`http://localhost:5116/user/${username}/${password}`)
        .then(response => {
            if (response.status === 200){
                console.log("User authenticated");

                return response.json();
            } else if (response.status === 404){
                // User is not found
                usernameError.innerHTML = 'Username not recognised, please try again';
                return;
            } else if (response.status === 401){
                // Password is incorrect
                passwordError.innerHTML = 'Your password is incorrect, please try again or reset it <br> by clicking here: <a href="resetuserpass.html">Reset Password</a>';
            } else{
                console.error("error", response.status);
            }
        })
        .then(data => {
            const userID = data.userId;
            
            data.ReviewTitle = reviewTitle;
            data.ReviewDescription = reviewDesc;
            data.Score = score;
            data.UserID = userID;
            data.GameID = gameID;

            fetch('http://localhost:5116/review', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify(data),
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
                if (data.status === 400){
                    console.log(data.errors);
                    console.log(data.errors.ReviewDescription[0]);
                    //if (data.errors.)
                    //customPopup(data.errors.ReviewDescription[0])
                    return;
                }else if (data.status === 200){
                    console.log("Success");
                }
            })

            .catch(error => {
                console.error("Error:", error);
            });
            
            
        })
        
        .catch(error => {
            console.error("Error:", error);
        });

           
}


document.getElementById("createreview").addEventListener("submit", createReview);