function savePreference(){
    var stayInChecked = document.getElementById('stayLoggedIn');
    var useLoStor = stayInChecked.checked;
    console.log("checked");

    // Ideally, localStorage would not be used and HTTP cookies would be used to then store
    // The user's authToken but this is not possible in this project without using a server
    // of some sorts, such as XAMPP

    // Creating a function to handle new game data
    localStorage.setItem('loginLocalStorage', useLoStor);
    if (useLoStor){
        var authToken = sessionStorage.getItem('authToken');
        // Copy data from session storage to local storage and set an expiration date
        if (authToken){
            var expriationDays = 7;
            var expirationTime = new Date().getTime() + expriationDays * 24 * 60 * 60 * 1000;
            
            const item = {
                value: authToken,
                expiry: expirationTime,
            };
            localStorage.setItem('authTokenLocal', JSON.stringify(item));
            sessionStorage.removeItem('authToken');
        }
    }
}


function loadPreference(){
    var authTokenDataSess = sessionStorage.getItem('authToken');
    var authTokenData = localStorage.getItem('authTokenLocal');
    if (authTokenData){
        var authToken = JSON.parse(authTokenData);
        
        var expirTime = authToken.expiry;
        const newtime = new Date().getTime();
        if (newtime >= expirTime){
            // Token has expired
            localStorage.removeItem('authTokenLocal');
            console.log('Token has expired');
            return;
        }
        // Check if the authToken matches the name of the stored data
        var userAuth = authTokenData ? 'authTokenLocal' : 'authTokenLocal';
        
        var getToken = localStorage.getItem(userAuth) || 'No Token';

        //console.log('Loaded Data: ', getToken);
    } else if (authTokenDataSess){
        return;
    }
    else{
        console.log('No token found');
        return;
    }
}


function loginStatus(){
    const authTokenSess = sessionStorage.getItem('authToken');
    const authTokenLocal = localStorage.getItem('authTokenLocal');

    var curURL = window.location.pathname;
    // Extract the filename from the URL
    var file = curURL.substring(curURL.lastIndexOf("/") + 1);
    
    if (authTokenSess){
        if (file === "login.html" || file === "createuser.html" || file === "index.html"){
            window.location.href = "home.html";
        } else{
            console.log("Signed In, In Session");
        }
        
    }
    else{
        if (authTokenLocal){
            if (file === "login.html" || file === "createuser.html" || file === "index.html"){
                window.location.href = "home.html";
            } else{
                console.log("Signed In Locally");
            }
        } else{
            if (file === "index.html"){
                return;
            } else if (file === "login.html"){
                return;
            } else if (file === "createuser.html"){
                return;
            } else{
                window.location.href = "index.html";
            }
        }
        
    }
}
loadPreference();