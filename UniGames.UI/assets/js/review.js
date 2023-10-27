// Extract the 'id' query parameter from the current page's URL
var urlparams = new URLSearchParams(window.location.search);
var gameid = urlparams.get('id');
console.log(gameid);

// Fetch game data from the server using the extracted 'gameid'
fetch(`http://localhost:5116/review/${gameid}`)
    .then(response => response.json())
    .then(data => {
        // Select the table body element where game data will be displayed
        const reviewTableBody = document.querySelector('#reviewTable #reviewtbody');

        // Check if the 'data' is an array (for multiple games) or a single game object
        if (Array.isArray(data)) {
            // If it's an array, loop through the games and append them to the table
            console.log(data);
            data.forEach(game => {
                const rrow = createTableRow(game);
                reviewTableBody.appendChild(rrow);
            });
        } else {
            // If it's a single game, create a row and append it to the table
            console.log(data);
            const rrow = createTableRow(data);
            reviewTableBody.appendChild(rrow);
        }
    })
    .catch(error => {
        // Handle errors when fetching game data
        console.error('Error fetching game data:', error);
    });

// Function to create a table row for a game
function createTableRow(review) {
    const rrow = document.createElement('tr');
    rrow.classList.add('review'); // Adding a class to the table row

    // Create table cells
    const reviewtitleCell = document.createElement('td');
    const reviewtitleLink = document.createElement('a');

    //reviewdetails is a placeholder for now 
    reviewtitleLink.href = 'reviewdetails.html?id=' + review.reviewID;
    reviewtitleLink.textContent = review.reviewTitle;
    reviewtitleCell.appendChild(reviewtitleLink);
    rrow.appendChild(reviewtitleCell);

    // Description for the review
    const reviewdescriptionCell = document.createElement('td');
    reviewdescriptionCell.textContent = review.reviewDescription;
    rrow.appendChild(reviewdescriptionCell);

    // Score for the game review
    const scoreCell = document.createElement('td');
    scoreCell.textContent = review.score;
    rrow.appendChild(scoreCell);
    
    // User Id for the game review
    const useridCell = document.createElement('td');
    useridCell.textContent = review.userName.username;
    rrow.appendChild(useridCell);

    reviewtitleLink.addEventListener('click', function (event) {
        // Handle the click event if needed
        console.log('Clicked on game with ID:', data.gameID.reviewID);
    });

    return rrow; // Returns the table row
}