// Get the Title parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('Username'); // Assuming 'Title' is the parameter name in the URL

// Construct the URL with the Title parameter
const apiUrl = `http://localhost:5116/userreview/${username}`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const userreviewTableBody = document.querySelector('#UserreviewTable tbody');

    // Loop through the array of games and append them to the table
    data.forEach(review => {
        const row = createTableRow(review);
        userreviewTableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching review data:', error);
  });

function createTableRow(review) {
    const row = document.createElement('tr');
    row.classList.add('review'); // Adding a class to the table row

    const reviewtitleCell = document.createElement('td');
    const reviewtitleLink = document.createElement('a');

    //reviewtitleLink.href = '.html?id=' + game.gameID; 
    reviewtitleLink.textContent = review.reviewTitle;
    reviewtitleCell.appendChild(reviewtitleLink);
    row.appendChild(reviewtitleCell);

    const reviewdescCell = document.createElement('td');
    // Tells the frontend to look in the game table then look in platforms and then get the platform name from the foreign key.
    reviewdescCell.textContent = review.reviewDescription;
    row.appendChild(reviewdescCell);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = review.score;
    row.appendChild(scoreCell);

    const userCell = document.createElement('td');
    userCell.textContent = review.userName.username;
    row.appendChild(userCell);

    // Attach click event listener to the link
    reviewtitleLink.addEventListener('click', function(event) {
        // Handle the click event if needed
        console.log('Clicked on review with ID:', review.reviewID);
    });

    return row;
}
