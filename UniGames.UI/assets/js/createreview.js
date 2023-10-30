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