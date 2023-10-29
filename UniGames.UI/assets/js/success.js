function successPages(){
    console.log("Error");
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
        default:
            successMessage = "An unknown success occurred?";
    }

    const successMessageP = document.getElementById("success-message");
    successMessageP.innerHTML = successMessage;
}
document.addEventListener("DOMContentLoaded", successPages);