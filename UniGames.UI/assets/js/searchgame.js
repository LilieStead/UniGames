// Get the Title parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('Title'); // Assuming 'Title' is the parameter name in the URL

// Construct the URL with the Title parameter
const apiUrl = `http://localhost:5116/game/${title}`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const gameTableBody = document.querySelector('#gameTable tbody');

    // Loop through the array of games and append them to the table
    data.forEach(game => {
        const row = createTableRow(game);
        gameTableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching game data:', error);
  });

function createTableRow(game) {
    const row = document.createElement('tr');
    row.classList.add('game'); // Adding a class to the table row

    const titleCell = document.createElement('td');
    const titleLink = document.createElement('a');

    titleLink.href = 'details.html?id=' + game.gameID; 
    titleLink.textContent = game.title;
    titleCell.appendChild(titleLink);
    row.appendChild(titleCell);

    const platformCell = document.createElement('td');
    // Tells the frontend to look in the game table then look in platforms and then get the platform name from the foreign key.
    platformCell.textContent = game.platformName.platformName;
    row.appendChild(platformCell);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = game.averageScore;
    row.appendChild(scoreCell);

    // Attach click event listener to the link
    titleLink.addEventListener('click', function(event) {
        // Handle the click event if needed
        console.log('Clicked on game with ID:', game.gameID);
    });

    return row;
}
