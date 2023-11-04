function successPages(){
    console.log("Success");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const successType = urlParams.get("success");

    let successMessage;
    switch (successType){
        case "1":
            successMessage = "Your Review has now been added!";
            break;
        case "2":
            successMessage = "Success! Your account has been deleted.";
            break;

        case "5":
            successMessage = "You have successfully reset your password!";
        case "3":
            successMessage = "Success! Your review has been deleted";
            break;
        default:
            successMessage = "An unknown success occurred?";
    }

    const successMessageP = document.getElementById("success-message");
    successMessageP.innerHTML = successMessage;
}
document.addEventListener("DOMContentLoaded", successPages);