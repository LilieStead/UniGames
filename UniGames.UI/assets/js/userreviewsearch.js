// Get the Title parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('Username'); // Assuming 'Title' is the parameter name in the URL

// Construct the URL with the Title parameter
const apiUrl = `http://localhost:5116/userreview/${username}`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      document.getElementById('loadingcontainer').style.display = 'none';
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    document.getElementById('loadingcontainer').style.display = 'none';
    const reviewbody = document.querySelector('#reviewbody');

    // Loop through the array of games and append them to the table
    data.forEach(review => {
      console.log(review.games.title)
      createReview(review);
    });
  })
  .catch(error => {
    console.error('Error fetching review data:', error);
  });

function createReview(review) {

  const starnumber = review.score
  var star = null 
  if (starnumber <= 10){
    // half a star
    star = '<i class="fa fa-star-half-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i>';
  }else if(starnumber <= 20 && starnumber >= 10){
    // one star 
    star = '<i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i>';
  }else if(starnumber <= 30 && starnumber >= 20){
    // one and a half star
    star = '<i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-half-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>';
  }else if(starnumber <= 40 && starnumber >= 30){
    //two stars
    star = '<i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i>'
  }else if(starnumber <= 50 && starnumber >= 40){
    //two and ahalf stars 
    star = '<i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-half-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i>'
  } else if(starnumber <= 60 && starnumber >= 50){
    //three starts
    star = '<i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i>';
  }else if(starnumber <= 70 && starnumber >= 60){
    //three and a half stars
    star = '<i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-half-o" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i>';
  }else if(starnumber <= 80 && starnumber >= 70){
    //four stars
    star = '<i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-o" aria-hidden="true"></i>';
  }else if (starnumber <= 90 && starnumber >= 80){
    // four and a half stars 
    star = '<i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-half-o" aria-hidden="true"></i>';
  }else if (starnumber <= 100 && starnumber >= 90){
    // five stars
    star = '<i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i>';
  }
  reviewbody.innerHTML +=
  `<div class="review">
    <div>\
      <p> <i class='fa fa-user-circle-o' aria-hidden='true'></i> ${review.userName.username} || ${review.games.title}</p>\
      <p class="rating"> ${star}</p>
    </div>\
    <div>\
    <h1>${review.reviewTitle}</h1>
    <p class="options"><a href="#">Edit review <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> || <a href="deletereview.html?id=${review.reviewID}">Delete review <i class="fa fa-trash" aria-hidden="true"></i></a> </p>
  </div>\
  <p> ${review.reviewDescription}\
  </div>`;

}

//     //reviewtitleLink.href = '.html?id=' + game.gameID; 
//     reviewtitleLink.textContent = review.reviewTitle;
//     reviewtitleCell.appendChild(reviewtitleLink);
//     row.appendChild(reviewtitleCell);

//     const reviewdescCell = document.createElement('td');
//     // Tells the frontend to look in the game table then look in platforms and then get the platform name from the foreign key.
//     reviewdescCell.textContent = review.reviewDescription;
//     row.appendChild(reviewdescCell);

//     const scoreCell = document.createElement('td');
//     scoreCell.textContent = review.score;
//     row.appendChild(scoreCell);

//     const userCell = document.createElement('td');
//     userCell.textContent = review.userName.username;
//     row.appendChild(userCell);

//     // Attach click event listener to the link
//     reviewtitleLink.addEventListener('click', function(event) {
//         // Handle the click event if needed
//         console.log('Clicked on review with ID:', review.reviewID);
//     });

//     return row;
// }
