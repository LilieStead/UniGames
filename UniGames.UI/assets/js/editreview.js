function searchReview(event){
    event.preventDefault();

    // Get UserID by Username
    fetch(`http://localhost:5116/user/${username}`)
        .then(response => {
            if (response.status === 200) {
                console.log("User authenticated");

                return response.json();
            } else if (response.status === 404) {
                // User is not found
                window.location.href = "error.html?error=2";
            } else {
                console.error("error", response.status);
            }
        })
        .then(data => {
            const UserID = data.UserId;
        }
    
     // Get GameID by Game Title
    ,fetch(`http://localhost:5116/game/${title}`)
        .then(response => {
             if (response.status === 200) {
                 console.log("Game authenticated");

                 return response.json();
             } else if (response.status === 404) {
                 // Game is not found
                 window.location.href = "error.html?error=2";
             } else {
                 console.error("error", response.status);
             }
        })
        .then(data => {
             const GameID = data.GameId;
        }

    // Find the review by GameID and UserID to get the ReviewID

   ,fetch('http://localhost:5116/review/')

}    

// The JS for updateing the review
function editReview(event){
    event.preventDefault();

    const formData = new FormData(document.getElementById("editreview"));

    const reviewTitle = formData.get("ReviewTitle");
    const reviewDesc = formData.get("ReviewDescription");
    const score = formData.get("Score");

    
    data.ReviewTitle = reviewTitle;
    data.ReviewDescription = reviewDesc;
    data.Score = score;
    data.UserID = UserID;
    data.GameID = GameID;


            fetch('http://localhost:5116/review/', {
                method: "",
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
            
}


document.getElementById("searchreview").addEventListener("submit", searchReview);
document.getElementById("editreview").addEventListener("submit", editReview);