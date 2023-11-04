// Uses the URL to get the specific ID
var urlParams = new URLSearchParams(window.location.search);
// Gets the ID and stores it in a variable
var gameID = urlParams.get('id');
// Logs the gameID
console.log('Game ID:', gameID, "successfully transferred");




function createReview(event){
    event.preventDefault();

    const formData = new FormData(document.getElementById("createreview"));

    const reviewTitle = formData.get("ReviewTitle");
    const reviewDesc = formData.get("ReviewDescription");
    const score = formData.get("Score");
    const username = formData.get('Username');
    const password = formData.get('Userpassword');

    
    const vtitle = document.getElementById('rtitle');
    const vdescription = document.getElementById('rdesc');
    const vscore = document.getElementById('score');
    const vusername = document.getElementById('user');
    const vpassword = document.getElementById('password');
    
    const titleerror = document.getElementById('titleerror');
    const descriptionerror = document.getElementById('descriptionerror');
    const scoreerror = document.getElementById('scoreerror');
    const usernameerror = document.getElementById('usernameerror');
    const passworderror = document.getElementById('passworderror');

    const numberValue = parseFloat(vscore.value);
    // Reset error messages before validation
    titleerror.innerHTML = '';
    descriptionerror.innerHTML = '';
    scoreerror.innerHTML = '';
    usernameerror.innerHTML = '';
    passworderror.innerHTML = '';
    let curFail = false;

    // Checks to see if the title contains no text
    if (vtitle.value === '' || vtitle.value === null) {
        event.preventDefault();
        titleerror.innerHTML = 'Your review needs a title';
        curFail = true;
    }
    // Checks to see if the description contains no text
    if (vdescription.value === '' || vdescription.value === null) {
        event.preventDefault();
        descriptionerror.innerHTML = 'You need to provide a description';
        curFail = true;
    // Checks if the length of the description is less than 20 or higher than 500
    } else if (vdescription.value.length < 20 || vdescription.value.length > 500) {
        event.preventDefault();
        descriptionerror.innerHTML = 'A description needs to be between 20 - 500 characters';
        curFail = true;
    }
    // Checks to see if the number is valid or less than 0 or bigger than 100
    if (isNaN(numberValue) || numberValue < 0 || numberValue > 100) {
        event.preventDefault();
        scoreerror.innerHTML = 'Your score needs to be between 0 and 100';
        curFail = true;
    }else{
        scoreerror.innerHTML = (null);
    }
    // Checks to see if the username is contains no text
    if (vusername.value === '' || vusername.value === null) {
        event.preventDefault();
        usernameerror.innerHTML = 'You must enter your username';
        curFail = true;
    }
    // Checks to see if the password contains no text
    if (vpassword.value === '' || vpassword.value === null){
        event.preventDefault();
        passworderror.innerHTML = 'You must enter your account\'s password';
        curFail = true;
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
                usernameerror.innerHTML = 'Username not recognised, please try again';
                return;
            } else if (response.status === 401){
                // Password is incorrect
                passworderror.innerHTML = 'Your password is incorrect, please try again or reset it <br> by clicking here: <a href="resetuserpass.html">Reset Password</a>';
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
            .then(response => response.json())
            .then(data => {
                console.log("API Response: ", data)
                window.location.href = "assets/inc/success.html?success=1";
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