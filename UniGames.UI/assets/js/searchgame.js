// Get the Title parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('Title');

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
    document.getElementById('loadingcontainer').style.display = 'none';
    const gameTableBody = document.querySelector('#gameTable tbody');
    if (data.length === 0) {
      document.getElementById('loadingcontainer').style.display = 'none';
      // No games found, display a message to the user
      const noGamesRow = document.createElement('tr');
      const noGamesCell = document.createElement('td');
      noGamesCell.colSpan = 3; // Set the colspan to cover all columns
      noGamesCell.textContent = 'No games found.';
      noGamesRow.appendChild(noGamesCell);
      gameTableBody.appendChild(noGamesRow);
    } else {
      // Loop through the array of games and append them to the table
      data.forEach(game => {
        const row = createTableRow(game);
        gameTableBody.appendChild(row);
      });
    }
  })
  .catch(error => {
    document.getElementById('loadingcontainer').style.display = 'none';
    console.error('Error fetching game data:', error);
  });

function createTableRow(game) {

  const starnumber = game.averageScore
  var star = null 
  if (starnumber <= 10){
      // half a star
      star = '<p class="star"><i class="fa fa-star-half-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i></p>';
  }else if(starnumber <= 20 && starnumber >= 10){
      // one star 
      star = '<p class="star"><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i></p>';
  }else if(starnumber <= 30 && starnumber >= 20){
      // one and a half star
      star = '<p class="star"><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-half-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i></p>';
  }else if(starnumber <= 40 && starnumber >= 30){
      //two stars
      star = '<p class="star"><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i></p>'
  }else if(starnumber <= 50 && starnumber >= 40){
      //two and ahalf stars 
      star = '<p class="star"><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-half-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i></p>'
  } else if(starnumber <= 60 && starnumber >= 50){
      //three starts
      star = '<p class="star"><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i></p>';
  }else if(starnumber <= 70 && starnumber >= 60){
      //three and a half stars
      star = '<p class="star"><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-half-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i></p>';
  }else if(starnumber <= 80 && starnumber >= 70){
      //four stars
      star = '<p class="star"><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i></p>';
  }else if (starnumber <= 90 && starnumber >= 80){
      // four and a half stars 
      star = '<p class="star"><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-half-o" aria-hidden="true"></i></p>';
  }else if (starnumber <= 100 && starnumber >= 90){
      // five stars
      star = '<p class="star"><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i></p>';
  }
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
  scoreCell.innerHTML += star;
  row.appendChild(scoreCell);

  // Attach click event listener to the link
  titleLink.addEventListener('click', function(event) {
    // Handle the click event if needed
    console.log('Clicked on game with ID:', game.gameID);
  });

  return row;
}
loginStatus();