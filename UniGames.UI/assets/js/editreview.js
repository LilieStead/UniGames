// Uses the URL to get the specific ID
var urlParams = new URLSearchParams(window.location.search);
// Gets the ID and stores it in a variable
var reviewID = urlParams.get('id');

function editReview(){
    const formData = new FormData(document.getElementById("editreview"));

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
        const reviewData = {
            ReviewTitle: reviewTitle,
            ReviewDescription: reviewDesc,
            Score: score, 
            UserID: userID,
        };

        fetch(`http://localhost:5116/editreview/${reviewID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
        .then(response => {
            if (response.status === 200){
                return response.json();
            } else if (response.status === 404){
                return Promise.reject("Error: 404");
            }else if (response.status === 401){
                return Promise.reject("Error: 401");
            }else if (response.status === 400){
                return Promise.reject("Error: 400");
            } else{
                console.error(response.status);
            }
        })
        .then(data => {
            console.log(data);
            modifySuccess("You have modified your review!");
        })
        .catch(error => {
            if (error.includes("Error: 404")){
                // This is not expected to show as the 
                customPopup("This review is not found, please select a valid review");
            } else if (error.includes("Error: 401")){
                customPopup("You are attempting to edit the incorrect review, please try again");
            }else if (error.includes("Error: 400")){
                customPopup("You are attempting to modify the game this review was made for. Stop.");
            }
        })
    })
    .catch(error =>{
        console.error(error);
    })
}


loginStatus();