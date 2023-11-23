var urlparams = new URLSearchParams(window.location.search);
var gameid = urlparams.get('id');

fetch(`http://localhost:5116/Game/${gameid}`)
.then(response => response.json())
.then(data => {
    console.log(data);
    const gameName = document.getElementById("gname");
    const platform = document.getElementById("platform");
    const gameDesc = document.getElementById('rdesc');
    const ageRating = document.getElementById('agrate');
    const devs = document.getElementById('gamedev');
    const genre = document.getElementById('genre');

    gameName.value = data.title;
    gameDesc.value = data.gameDetail.description;
    ageRating.value = data.gameDetail.ageRating;
    devs.value = data.gameDetail.developer;
    genre.value = data.gameDetail.genre;
    platform.value = data.platformName.platformID;

    
    
})



// Function to update game details in the SQL database
function updateGame(){


    //Use the built in FormData
    const formData = new FormData(document.getElementById("updategame"));

    const gameName = formData.get("Title");
    const platform = formData.get("Platform");
    const rawDate = formData.get('ReleaseDate');

    
    let blankFields = false

    const gameDesc = formData.get('Description');
    const ageRating = formData.get('AgeRating');
    const devs = formData.get('Developer');
    const genre = formData.get('Genre');


    const titleError = document.getElementById('titleerror');
    const platformError = document.getElementById('platformerror');
    const gameDescError = document.getElementById('descerror');
    const ageratingerror = document.getElementById('ageerrors');
    const deverror = document.getElementById('deverror');
    const genreerror = document.getElementById('genreerror')


    titleError.innerHTML = '';
    platformError.innerHTML = '';
    gameDescError.innerHTML = '';
    ageratingerror.innerHTML = '';
    deverror.innerHTML = '';
    genreerror.innerHTML = '';

    


    if (gameName === '' || gameName === null) {
        titleError.innerHTML = 'You must enter your game name!';
        blankFields = true;
    }
    // Checks to see if the password contains no text
    if (platform === '' || platform === null){
            platformError.innerHTML = 'You must select a platform!';
            blankFields = true;
    }
    if (gameDesc == null || gameDesc == ''){
        gameDescError.innerHTML = 'You need to enter a game description!';
    }else if (gameDesc.length < 20){
        gameDescError.innerHTML = 'Your game description needs to be more than 20 characters!';
    }else if (gameDesc.length > 200){
        gameDescError.innerHTML = "Your game description cannot be more than 200 characters!";
    }
    if (ageRating == null || ageRating ==''){
        ageratingerror.innerHTML = 'You need to enter your games age rating!'
    }
    if (devs == null || devs == ''){
        deverror.innerHTML = 'you need to enter the games developer!'
    }
    if (genre == null || genre == ''){
        genreerror.innerHTML = 'You need to enter your games genre!'
    } else if (genre.length > 50){
        genreerror.innerHTML = 'You game genre cannot be more than 50 characters!'
    }

    if (blankFields){
        return;
    }




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
                modifySuccess("You have updated this game successfully!");
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

