// // Extract the 'id' query parameter from the current page's URL
var urlparams = new URLSearchParams(window.location.search);
var gameid = urlparams.get('id');
console.log(gameid);

// // Gets the ID of the a tag (link)
// var link = document.getElementById('cReview');
// // When clicked, ensure that this link also brings the gameid through
// link.href = 'createreview.html?id=' + gameid;


// Fetch game data from the server using the extracted 'gameid'
fetch(`http://localhost:5116/gamedetail/${gameid}`)
    .then(response => response.json())
    .then(data => {
        // Select the table body element where game data will be displayed
        document.getElementById('loadingcontainer').style.display = 'none';
        const gameTableBody = document.querySelector('#gameTable tbody');

        // Check if the 'data' is an array (for multiple games) or a single game object
        if (Array.isArray(data)) {
            // If it's an array, loop through the games and append them to the table
            console.log(data);
            data.forEach(game => {
                const row = createTableRow1(game);
                gameTableBody.appendChild(row);
            });
        } else {
            // If it's a single game, create a row and append it to the table
            console.log(data);
            const row = createTableRow1(data);
            gameTableBody.appendChild(row);

        }
    })
    .catch(error => {
        // Handle errors when fetching game data
        document.getElementById('loadingcontainer').style.display = 'none';
        console.error('Error fetching game data:', error);
    });

// Function to create a table row for a game
function createTableRow1(data) {
    const row = document.createElement('tr');
    row.classList.add('data'); // Adding a class to the table row

    // Create table cells
    const titleCell = document.createElement('td');
    const titleLink = document.createElement('a');
    titleLink.className = "rtitlebutton";

    titleLink.href = 'details.html?id=' + data.detailID;
    titleLink.textContent = data.gameID;
    titleCell.appendChild(titleLink);
    row.appendChild(titleCell);

    // Description for the game
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = data.description;
    row.appendChild(descriptionCell);

    // Age rating for the game
    const ageRatingCell = document.createElement('td');
    ageRatingCell.textContent = data.ageRating;
    row.appendChild(ageRatingCell);
    
    // Developer for the game
    const developerCell = document.createElement('td');
    developerCell.textContent = data.developer;
    row.appendChild(developerCell);

    // Genre for the game
    const genreCell = document.createElement('td');
    genreCell.textContent = data.genre;
    row.appendChild(genreCell);

    titleLink.addEventListener('click', function (event) {
        // Handle the click event if needed
        console.log('Clicked on game with ID:', data.gameID);
    });

    return row; // Returns the table row
}
