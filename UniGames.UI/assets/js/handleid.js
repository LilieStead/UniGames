var currentURL = window.location.href;
var urlParams = new URL(currentURL);
var dynamicID = urlParams.searchParams.get('id');

var link = document.getElementById('cReview');
link.href = 'createreview.html?id=' + dynamicID;
