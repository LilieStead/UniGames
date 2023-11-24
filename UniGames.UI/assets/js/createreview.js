// Uses the URL to get the specific ID
var urlParams = new URLSearchParams(window.location.search);
// Gets the ID and stores it in a variable
var gameID = urlParams.get('id');
// Logs the gameID
console.log('Game ID:', gameID, "successfully transferred");


function createReview(){

    const formData = new FormData(document.getElementById("createreview"));

    const reviewTitle = formData.get("ReviewTitle");
    const reviewDesc = formData.get("ReviewDescription");
    const score = formData.get("Score");


    const titleError = document.getElementById('titleerror');
    const descriptionError = document.getElementById('descriptionerror');
    const scoreError = document.getElementById('scoreerror');


    const numberValue = parseFloat(score);
    // Reset error messages before validation
    titleError.innerHTML = '';
    descriptionError.innerHTML = '';
    scoreError.innerHTML = '';

    let curFail = false;

    // Checks to see if the title contains no text
    if (reviewTitle === '' || reviewTitle === null) {
        titleError.innerHTML = 'Your review needs a title';
        curFail = true;
    }
    // Checks to see if the description contains no text
    if (reviewDesc === '' || reviewDesc === null) {
        descriptionError.innerHTML = 'You need to provide a description';
        curFail = true;
    // Checks if the length of the description is less than 20 or higher than 500
    } else if (reviewDesc.length < 20 || reviewDesc.length > 500) {
        descriptionError.innerHTML = 'A description needs to be between 20 - 500 characters';
        curFail = true;
    }
    // Checks to see if the number is valid or less than 0 or bigger than 100
    if (isNaN(numberValue) || numberValue < 0 || numberValue > 100) {
        scoreError.innerHTML = 'Your score needs to be between 0 and 100';
        curFail = true;
    }else{
        scoreError.innerHTML = (null);
    }
        
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
            if (response.status === 201){
                return response.json()
            } else if (response.status === 400){
                return Promise.resolve(response.json());
            } else{
                console.error("Error:", response.status);
            }
        })
        .then(rdata => {
            console.log("API Response: ", rdata);
            if ('status' in rdata){
                if (rdata.status === 400){
                    console.log(rdata.errors);
                    console.log(rdata.errors.ReviewDescription[0]);
                    customPopup(rdata.errors.ReviewDescription[0]);
                }else{
                    console.log("Unexpected Status/Error: ", rdata.status);
                }
            }else{
                console.log("No status returned, assuming success.");
                // Invokes the modifySuccess() function and adds the message to it
                modifySuccess("Your review has been added, thank you!");
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

