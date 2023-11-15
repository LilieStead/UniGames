// Create an attempts counter with a set timeout duration
let passAttempts = 0;
const maxAttempts = 5;
const timeOut = 120000;
// Interval in which the function will run (for a timer to work)
let interval;

// Get the URL of the page
var curURL = window.location.pathname;
// Extract the filename from the URL
var fileName = curURL.substring(curURL.lastIndexOf("/") + 1)

// Function to handle password timeouts
function passwordTimeout(){
    clearInterval(interval);
    // Check to see if a timout is currently active
    const curTime = sessionStorage.getItem('passwordTimeout');
    if (curTime){
        // Converts the current time left into a base-10 integer
        const endTime = parseInt(curTime, 10);
        // Specifies if the cooldown is actually active if both are true
        if (!isNaN(endTime) && Date.now() < endTime){
            // Maximum attempts have been reached
            passAttempts = maxAttempts;
            // Calculate the remaining time
            const timeRemain = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
            // Update the countdown in the HTML
            document.getElementById('timeout-countdown').textContent = `Time Left Until You Can Use The Form: ${timeRemain} seconds`;
            // If the current file is the reset user password page then
            if (fileName === "resetuserpass.html"){
                // Do not mention the reset password button as it is not present on this page
                // This prevents errors with the timer not working
                interval = setInterval(passwordTimeout, 1000);
                return;
            }else{
                interval = setInterval(passwordTimeout, 1000);
                document.getElementById('crPRButton').style.display = 'block';
                return;
            }
            
        }
        else{
            // Sets the countdown to be null
            document.getElementById('timeout-countdown').textContent = '';
            if (fileName !== "resetuserpass.html"){
                // Removes the reset password button
                document.getElementById('crPRButton').style.display = 'none';
            }
            
            // Re-enables both inputs
            document.getElementById('password').disabled = false;
            document.getElementById('password2').disabled = false;
            // Sets the background colour to be white (indicates it is accepting inputs)
            document.getElementById('password').style.backgroundColor = 'white';
            document.getElementById('password2').style.backgroundColor = 'white';
            // Add the placeholders back in
            document.getElementById('password').placeholder = 'Enter your new password here...';
            document.getElementById('password2').placeholder = 'Enter your new password again';

            document.getElementById('passworderror').innerHTML = '';
            // Remove the localStorage item for disabling fields
            localStorage.removeItem('passwordFieldsDisabled');
        }
    }
    const newPassActual = document.getElementById('password').value;
    const newPassConfirm = document.getElementById('password2').value;
    // If both of the passwords don't match with each other then
    if (newPassActual !== newPassConfirm){
        // Log an error to the console to say the passwords do not match
        console.error('Passwords do not match');
        // Add 1 to passAttempts
        passAttempts++;
        // Logs the increasing counter to the console
        console.log("Counter added." , '-', passAttempts);
        // If the passAttempts are equal or more than the maxAttempts then
        if (passAttempts >= maxAttempts){
            // Add the timeout duration to the current time
            const endTime = Date.now() + timeOut;
            // Set a new item in sessionStorage called passwordTimeout with the current time provided 
            sessionStorage.setItem('passwordTimeout', endTime.toString());
            
            // Remembers the disabled state of the inputs
            localStorage.setItem('passwordFieldsDisabled', 'true');
            // Remove the content from the password fields -- Prevents this from looping
            document.getElementById('password').value = '';
            document.getElementById('password2').value = '';
            // Disable the password fields -- Means they cannot progress for 2 minutes unless JavaScript is disabled
            document.getElementById('password').disabled = true;
            document.getElementById('password2').disabled = true;
            // Sets the background colour to grey -- Could be modified to a different colour
            document.getElementById('password').style.backgroundColor = 'grey';
            document.getElementById('password2').style.backgroundColor = 'grey';
            // Removes the placeholders
            document.getElementById('password').placeholder = '';
            document.getElementById('password2').placeholder = '';
            // Sets the password error to tell the user to wait for the cooldown to expire
            document.getElementById('passworderror').innerHTML = 'Please Wait For The Cooldown To Expire';
            

            // Display the countdown message
            const timeRemain = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
            if (fileName !== "resetuserpass.html"){
                // Displays the reset password button
                document.getElementById('crPRButton').style.display = 'block';
            }
            document.getElementById('timeout-countdown').textContent = `Time Left Until You Can Use The Form: ${timeRemain} seconds`;
            // Utilises the custom popup to tell the user they have reached the max attempts
            customPopup(`Maximum login attempts reached, please wait 2 minutes and try again.`);
            interval = setInterval(passwordTimeout, 1000);
        }
    }
    if (newPassActual === newPassConfirm){
        passAttempts = 0;
        sessionStorage.removeItem('passwordTimeout');
        localStorage.removeItem('passwordFieldsDisabled');
        
    }
    
}

// Start the time when the page loads and update the timer every second
interval = setInterval(passwordTimeout, 1000);
window.addEventListener('load', function(){
    if (localStorage.getItem('passwordFieldsDisabled') === 'true'){
        document.getElementById('password').disabled = true;
        document.getElementById('password2').disabled = true;
        // Sets the background colour to grey -- Could be modified to a different colour
        document.getElementById('password').style.backgroundColor = 'grey';
        document.getElementById('password2').style.backgroundColor = 'grey';
        // Removes the placeholders
        document.getElementById('password').placeholder = '';
        document.getElementById('password2').placeholder = '';
        
    }
})