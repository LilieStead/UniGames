// Creating a function to handle new game data
function createGame(){

    const formData = new FormData(document.getElementById("NewGame"));

    const title = formData.get('Title');

    const platform = parseInt(formData.get('Platform'));

    const rawDate = formData.get('ReleaseDate');
    const dateObject = new Date(rawDate);
    const releaseDate = dateObject.toISOString();

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
        console.log('API Response: ', responseData)
        modifySuccess("You have successfully created a game!");
    })
    .catch(error=> {
        console.error('Error: ', error);
    });
}
