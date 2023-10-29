function errorPages(){
    console.log("Error");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const errorType = urlParams.get("error");

    let errorMessage;
    switch (errorType){
        case "1":
            errorMessage = "Error: Your password is incorrect, please try again";
            break;
        case "2":
            errorMessage = "Error: Your username is incorrect, please try again";
            break;
        case "3":
            errorMessage = "Error: You have previously created reviews for games, <br> \
            please delete your current reviews and try again.";
            break;
        default:
            errorMessage = "An unknown error occurred";
    }

    const errorMessageP = document.getElementById("error-message");
    errorMessageP.innerHTML = errorMessage;
}
document.addEventListener("DOMContentLoaded", errorPages);