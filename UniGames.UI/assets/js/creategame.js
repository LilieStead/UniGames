//const loggeduser2 = sessionStorage.removeItem('loggedusername');
//const loggedemail2 = sessionStorage.removeItem('loggedemail');
//const loggedpass2 = sessionStorage.removeItem('loggedpassword');

function createGame(event){
    event.preventDefault();

    const formData = new FormData(document.getElementById("NewGame"));

    const title = formData.get('Title');

    const platform = parseInt(formData.get('Platform'));

    const rawDate = formData.get('ReleaseDate');


    let blankFields = false;

    const releaseError2 = document.getElementById('releasedate');
    releaseError2.innerHTML = '';
    

    if (rawDate === '' || rawDate === null) {
        event.preventDefault();
        releaseError2.innerHTML = 'You must select a date!';
        blankFields = true;
    }

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

    // Checks to see if the username is contains no text
    if (title === '' || title === null) {
        event.preventDefault();
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
    const dateObject = new Date(rawDate);
    const releaseDate = dateObject.toISOString();

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
    .then (response => response.json())
    .then (data => {
        
    const userID = data.userID;

    const gamedata = {
        Title: title,
        PlatformID: platform,
        ReleaseDate: releaseDate,
        UserID: userID,
    };

    


    fetch('http://localhost:5116/game' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gamedata),
    })
    .then(response => response.json())
    .then(responseData => {
        console.log('API Response: ', responseData);
        console.log(responseData.gameID)
        const detailData = {
            GameID: responseData.gameID,
            Description: gameDesc,
            AgeRating: ageRating,
            Developer: devs,
            Genre: genre
        };

        fetch(`http://localhost:5116/gameDetail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(detailData),
        })
        .then(response => {
            if (response.status === 201){
                return response.json();
            }
            else{
                console.error(response.status);
            }
        })
        .then(data => {
            console.log(data);

            modifySuccess("Your have successfully created a game!");
        })
        .catch(error =>{
            console.error(error);
            customPopup("Error");
        })
        //window.location.href = "assets/inc/success.html?success=8";
    })
    .catch(error=> {
        console.error('Error: ', error);
        modifyError("Something went wrong :(");
    });



    })
    .catch (error => {
        console.error(error);
    })


}

loginStatus();
document.getElementById("NewGame").addEventListener('submit', createGame);