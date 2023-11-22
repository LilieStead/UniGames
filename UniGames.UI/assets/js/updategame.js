var urlparams = new URLSearchParams(window.location.search);
var gameid = urlparams.get('id');

// Function to update game details in the SQL database
function updateGame(event){
    event.preventDefault();

    //const activeTimeout = timeoutstatus();

    //Use the built in FormData
    const formData = new FormData(document.getElementById("updategame"));

    const gameName = formData.get("Title");
    const platform = formData.get("Platform");
    const releaseDate = formData.get("ReleaseDate");

    const gameDesc = formData.get('Description');
    const ageRating = formData.get('AgeRating');
    const devs = formData.get('Developer');
    const genre = formData.get('Genre');

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
    const userIDSess = sessionStorage.getItem('authToken');
    const userIDLocal = localStorage.getItem('authTokenLocal');
    const authToken = JSON.parse(userIDLocal);
    //console.log(authToken.value);
    var idType;

    if (userIDSess){
        idType = "session";
    } else{
        idType = "local";
    }

    const apiURL = idType === 'session'
    ? `http://localhost:5116/user/decodeToken?jwtToken=${userIDSess}`
    : `http://localhost:5116/user/decodeToken?jwtToken=${authToken.value}`;


    fetch(apiURL)
    .then(response => response.json())
    .then(data =>{

        const userID = data.userID;
        const gameData = {
            Title: gameName,
            PlatformID: platform,
            ReleaseDate: releaseDate,
            UserID: userID,
        };

        fetch(`http://localhost:5116/update-game/${gameid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameData),
        })
        .then(response => {
            if (response.status === 200){
                return response.json()
            }
            else if (response.status === 401){
                return Promise.reject("Error: 401");
            } else if (response.status === 400){
                return Promise.reject("Error: 400");
            }
            else{
                console.error(response.status);
            }
        })
        .then(rdata => {
            console.log("API Response: ", rdata);
            console.log(data.gameID);
            //window.location.href = "assets/inc/success.html?success=4";
            const detailData = {
                GameID: gameid,
                Description: gameDesc,
                AgeRating: ageRating,
                Developer: devs,
                Genre: genre
            };

            fetch(`http://localhost:5116/updatedetails/${gameid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(detailData),
            })
            .then(response => {
                if (response.status === 200){
                    return response.json();
                } else if (response.status === 401){
                    return Promise.reject("Error: 401");
                }
                else{
                    console.error(response.status);
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
                if (error.includes("Error: 401")){
                    customPopup("The game you are trying to update does not match the game in the database, please try another game");
                }
            })
        })
    
        .catch(error => {
            console.error("Error:", error);
            if (error.includes("Error: 401")){
                customPopup("Cannot delete game you did not make m8");
            } else if (error.includes("Error: 400")){
                customPopup("Password does not match user");
            }
        })
        
    })
    .catch(error => {
        console.error(error);
        
    })
}
loginStatus();
document.getElementById('updategame').addEventListener('submit', updateGame);