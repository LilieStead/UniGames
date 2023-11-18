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

    const titleError = document.getElementById('titleerror');
    const platformError = document.getElementById('platformerror');
   
    titleError.innerHTML = '';
    platformError.innerHTML = '';
   

    // Checks to see if the username is contains no text
    if (title === '' || title === null) {
        event.preventDefault();
        titleError.innerHTML = 'You must enter your game name!';
        blankFields = true;
    }
    // Checks to see if the password contains no text
    if (platform === '' || platform === null){
            platformError.innerHTML = 'You must select a platform!';
            curFail = true;
    }

    const dateObject = new Date(rawDate);
    const releaseDate = dateObject.toISOString();

    if (blankFields){
        return;
    }


    const data = {
        Title: title,
        PlatformID: platform,
        ReleaseDate: releaseDate,
    };


    fetch('http://localhost:5116/game' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        console.log('API Response: ', responseData);
        window.location.href = "assets/inc/success.html?success=8";
    })
    .catch(error=> {
        console.error('Error: ', error);
    });
}

loginStatus();
document.getElementById("NewGame").addEventListener('submit', createGame);