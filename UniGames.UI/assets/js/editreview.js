let UserId; 
let GameID;
let reviewID;

function searchReview(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("searchreview"));
    const username = formData.get("username");
    const title = formData.get("title");

    // Get UserID by Username
    fetch(`http://localhost:5116/user/${username}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.error("Error fetching user:", response.status);
                throw new Error("User not found");
            }
        })
        .then(data => {
            UserId = data.userId;
            console.log(UserId);

            // Get GameID by Game Title
            fetch(`http://localhost:5116/game/${title}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        console.error("Error fetching game:", response.status);
                        throw new Error("Game not found");
                    }
                })
                .then(data => {
                    GameID = data[0].gameID;
                    console.log(GameID);

                    // Find the review by GameID and UserID to get the ReviewID
                    fetch(`http://localhost:5116/review/${UserId}/${GameID}`)
                        .then(response => {
                            if (response.status === 200) {
                                console.log("Review Found");
                                return response.json();
                            } else {
                                console.error("Error fetching review:", response.status);
                                throw new Error("Failed to fetch review");
                            }
                        })
                        .then(data => {
                            // Populate form fields with review data
                            document.getElementById("rtitle").value = data[0].reviewTitle;
                            document.getElementById("rdesc").value = data[0].reviewDescription;
                            document.getElementById("score").value = data[0].score;
                            reviewID = data[0].reviewID;
                        })
                })   
        })

}



// The JS for updateing the review
function editReview(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("editreview"));

    const reviewTitle = formData.get("ReviewTitle");
    const reviewDesc = formData.get("ReviewDescription");
    const score = formData.get("Score");

    // Assuming data is an empty object
    const data = {};

    data.ReviewTitle = reviewTitle;
    data.ReviewDescription = reviewDesc;
    data.Score = score;

    fetch(`http://localhost:5116/review/${reviewID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(responseData => {
            console.log("API Response: ", responseData);
            alert("Review was updated successfully!");
        })
        .catch(error => {
            console.error("Error:", error);
        });
}



document.getElementById("searchreview").addEventListener("submit", searchReview);
document.getElementById("editreview").addEventListener("submit", editReview);