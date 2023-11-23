var urlparams = new URLSearchParams(window.location.search);
var gameid = urlparams.get('id');
console.log(gameid);
// Function to update game details in the SQL database
function updateGame(){

    //const activeTimeout = timeoutstatus();

    //Use the built in FormData
    const formData = new FormData(document.getElementById("updategame"));

    const gameName = formData.get("Title");
    const platform = formData.get("Platform");
    const releaseDate = formData.get("ReleaseDate");


    //const gameNameError = document.getElementById('Game Name Error')
    //const platformError = document.getElementById('Platform Error')
    //const releaseDateError = document.getElementById('Release Date Error')
    

    /*let hasErrors = false;


    if (gameName === '' || gameName === null) {
        gameNameError.textContent = 'You must enter a Game Name';
        hasErrors = true;
    } else{
        gameNameError.textContent = '';
        hasErrors = false;
    }

    if (platform === '' || platform === null) {
        platformError.textContent = 'You must select a valid Platform';
        hasErrors = true;
    } else{
        platformError.textContent = '';
        hasErrors = false;
    }

    if (releaseDate === '' || releaseDate === null) {
        releaseDateError.textContent = 'You must enter a valid Release Date';
        hasErrors = true;
    } else {
        releaseDateError.textContent = '';
        hasErrors = false;
    }

    if (hasErrors){
        return;
    }*/


    const data = {
        Title: gameName,
        PlatformID: platform,
        ReleaseDate: releaseDate,
    };


    fetch(`http://localhost:5116/update-game/${gameid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log("API Response: ", data)
        window.location.href = "assets/inc/success.html?success=4";
    })

    .catch(error => {
        console.error("Error:", error);
    })
    
}
