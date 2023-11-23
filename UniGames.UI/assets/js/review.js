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
                const row = createTableRow(game);
                reviewTableBody.appendChild(row);
            });
        } else {
            // If it's a single game, create a row and append it to the table
            console.log(data);
            const row = createTableRow(data);
            reviewTableBody.appendChild(row);
        }
    })
    .catch(error => {
        // Handle errors when fetching game data
        console.error('Error fetching game data:', error);
    });

// Function to create a table row for review details
function createTableRow(review) {
    const row = document.createElement('tr');
    row.classList.add('review'); // Adding a class to the table row

    // Create table cells
    const reviewtitleCell = document.createElement('td');
    const reviewtitleLink = document.createElement('a');

    //reviewdetails is a placeholder for now 
    reviewtitleLink.href = 'deletereview.html?id=' + review.reviewID;
    reviewtitleLink.textContent = review.reviewTitle;
    reviewtitleCell.appendChild(reviewtitleLink);
    row.appendChild(reviewtitleCell);

    // Description for the review
    const reviewdescriptionCell = document.createElement('td');
    reviewdescriptionCell.textContent = review.reviewDescription;
    row.appendChild(reviewdescriptionCell);
    

    // Score for the game review
    const scoreCell = document.createElement('td');
    scoreCell.textContent = review.score;
    row.appendChild(scoreCell);
    
    // User Id for the game review
    const useridCell = document.createElement('td');
    useridCell.textContent = review.userName.username;
    row.appendChild(useridCell);

    //Delete review link 
    const descdel = document.createElement('td');

    const deleteLink = document.createElement('a');
    deleteLink.href = "deletereview.html?id=" + review.reviewID;
    deleteLink.innerHTML = "&vellip;"; //Creates vertical ellipsis 
    deleteLink.classList.add("deletereviewbutton"); // Adds the 'deletereviewbutton' class.

    //When user moves mouse over it will display "Delete"
    deleteLink.addEventListener("mouseover", function () {
        deleteLink.textContent = "Delete";
    });

    //Reset to ellipsis when the user moves the mouse off
    deleteLink.addEventListener("mouseout", function () {
        deleteLink.innerHTML = "&vellip;"; //Links the vertical ellipsis  
    });

    descdel.appendChild(deleteLink);
    row.appendChild(descdel);

    return row; // Returns the table row
}