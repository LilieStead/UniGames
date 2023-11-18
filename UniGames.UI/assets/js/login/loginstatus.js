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
        // Copy data from session storage to local storage

        if (authToken){
            var expriationDays = 1;
            var expirationTime = new Date().getTime() + expriationDays * 60 * 1000;
            
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
    // var usernameData = localStorage.getItem('localloggedusername') === 'true';
    // var emailData = localStorage.getItem('localloggedemail') === 'true';
    // var passwordData = localStorage.getItem('localloggedpassword') === 'true';
    var authTokenData = localStorage.getItem('authTokenLocal');
    if (authTokenData){
        var authToken = JSON.parse(authTokenData);
        var expirTime = authToken.expiry;
        console.log("Extime", new Date(expirTime).toLocaleString());
        const newtime = new Date().getTime();
        console.log("NEwqtime",  new Date(newtime).toLocaleString());
        if (newtime >= expirTime){
            // Token has expired
            localStorage.removeItem('authTokenLocal');
            console.log('Token has expired');
            return;
        }

        console.log('Token is valid still');
        // var user = usernameData ? 'localloggedusername' : 'localloggedusername';
        // var email = emailData ? 'localloggedemail' : 'localloggedemail';
        // var password = passwordData ? 'localloggedpassword' : 'localloggedpassword';
        var userAuth = authTokenData ? 'authTokenLocal' : 'authTokenLocal';

        // var getData1 = localStorage.getItem(user) || 'Default Data';
        // var getData2 = localStorage.getItem(email) || 'Default Data';
        // var getData3 = localStorage.getItem(password) || 'Default Data';
        var getToken = localStorage.getItem(userAuth) || 'No Token';

        console.log('Loaded Data: ', getToken);
    } else{
        console.log('No token found');
    }
    
}


function loginStatus(){
    // const loggeduser = sessionStorage.getItem('loggedusername');
    // const loggedemail = sessionStorage.getItem('loggedemail');
    // const loggedpass = sessionStorage.getItem('loggedpassword');

    // const localuser = localStorage.getItem('localloggedusername');
    // const localemail = localStorage.getItem('localloggedemail');
    // const localpass = localStorage.getItem('localloggedpassword');
    const authTokenSess = sessionStorage.getItem('authToken');
    const authTokenLocal = localStorage.getItem('authTokenLocal');

    console.log(authTokenSess, "also local?= ", authTokenLocal);
    var curURL = window.location.pathname;
    // Extract the filename from the URL
    var file = curURL.substring(curURL.lastIndexOf("/") + 1);
    
    // if (loggeduser && loggedemail && loggedpass){
    if (authTokenSess){
        if (file === "login.html" || file === "createuser.html" || file === "index.html"){
            window.location.href = "home.html";
        } else{
            // Failsafe if team members accidentally add this back
            const removeSignUp = document.getElementById('signup-page');
            removeSignUp.remove();
        }
        
    }
    else{
        //if (localuser && localemail && localpass){
        if (authTokenLocal){
            if (file === "login.html" || file === "createuser.html" || file === "index.html"){
                window.location.href = "home.html";
            } else{
                // Failsafe if team members accidentally add this back
                const removeSignUp = document.getElementById('signup-page');
                removeSignUp.remove();
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