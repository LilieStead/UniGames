// Uses the URL to get the specific ID
var urlParams = new URLSearchParams(window.location.search);
// Gets the ID and stores it in a variable
var reviewID = urlParams.get('id');
// Logs the gameID
console.log('Review:', reviewID, "successfully transferred");


function deleteReview(event){
    event.preventDefault();

    const formData = new FormData(document.getElementById("deletereview"));

    const username = formData.get('Username');
    const password = formData.get('Userpassword');

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
                window.location.href = "assets/inc/success.html?success=3";
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


document.getElementById("deletereview").addEventListener("submit", deleteReview);