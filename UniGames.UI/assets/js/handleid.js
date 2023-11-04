// Universal variables for use in all functions
var currentURL = window.location.href;
var urlParams = new URL(currentURL);
// May not be universal based on the id you are getting (if it isn't called id for example)
var dynamicID = urlParams.searchParams.get('id');


const cReviewHandle = () => {
    var link = document.getElementById('cReview');
    // Sends to the create review page with the current ID (game ID in this case)
    link.href = 'createreview.html?id=' + dynamicID;
}


