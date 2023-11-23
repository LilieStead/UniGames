// Extract the 'id' query parameter from the current page's URL
// Extract the 'id' query parameter from the current page's URL
var urlparams = new URLSearchParams(window.location.search);
var reviewid = urlparams.get('id');
console.log(reviewid);

// Select the table body element where review data will be displayed // Adjust the selector as needed

// Fetch review data from the server using the extracted 'reviewid'
fetch(`http://localhost:5116/review/${reviewid}`)
    .then(response => response.json())
    .then(data => {
        // Select the table body element where game data will be displayed
        const reviewTableBody = document.querySelector('#reviewTable #reviewtbody');
  
        // Check if the 'data' is an array (for multiple reviews) or a single review object
        // If it's an array, loop through the reviews and append them to the table
        if(Array.isArray(data)){
        console.log(data);
        data.forEach(review => {
            createReview(review);
            
        });}
        else{
            createReview(data)
        }
    })
    .catch(error => {
        // Handle errors when fetching review data
        console.error('Error fetching review data:', error);
    });


// Function to create a table row for a review
function createReview(review) {
    let reviewTableBody = document.querySelector('#detail-review');
    const starnumber = review.score;
    var star = null;
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
    reviewTableBody.innerHTML +=
            `<div class="review">
                <div>
                    <p><i class='fa fa-user-circle-o' aria-hidden='true'></i> ${review.userName.username}</p>
                    <p class="rating">${star}</p>
                </div>
                <div>
                    <h1>${review.reviewTitle}</h1>
                    <p class="options"><a href="#">Edit review <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> || <a href="deletereview.html?id=${review.reviewID}">Delete review <i class="fa fa-trash" aria-hidden="true"></i></a></p>
                </div>
                <p>${review.reviewDescription}</p>
            </div>`;

}
