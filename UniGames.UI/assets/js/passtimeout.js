// Create an attempts counter with a set timeout duration
let passAttempts = 0;
const maxAttempts = 5;
const timeOut = 120000;
let interval;

// Function to handle password timeouts
function passwordTimeout(){
    clearInterval(interval);
    // Check to see if a timout is currently active
    const curTime = sessionStorage.getItem('passwordTimeout');
    if (curTime){
        const endTime = parseInt(curTime, 10);
        if (!isNaN(endTime) && Date.now() < endTime){
            passAttempts = maxAttempts;
            // Calculate the remaining time
            const timeRemain = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
            // Update the countdown in the HTML
            document.getElementById('timeout-countdown').textContent = `Time Left Until You Can Use The Form: ${timeRemain} seconds`;
            interval = setInterval(passwordTimeout, 1000);
            return;
        }
        else{
            // Sets the countdown to be null
            document.getElementById('timeout-countdown').textContent = '';
            // Re-enables both inputs
            document.getElementById('password').disabled = false;
            document.getElementById('password2').disabled = false;
            // Sets the background colour to be white (indicates it is accepting inputs)
            document.getElementById('password').style.backgroundColor = 'white';
            document.getElementById('password2').style.backgroundColor = 'white';
            // Add the placeholders back in
            document.getElementById('password').placeholder = 'Enter your new password here...';
            document.getElementById('password2').placeholder = 'Enter your new password again';
            // Remove the localStorage item for disabling fields
            localStorage.removeItem('passwordFieldsDisabled');
        }
    }

    const newPassActual = document.getElementById('password').value;
    const newPassConfirm = document.getElementById('password2').value;


    

    if (newPassActual !== newPassConfirm){
        console.error('Passwords do not match');
        passAttempts++;
        console.log("Counter added." , '-', passAttempts);
        if (passAttempts >= maxAttempts){
            const endTime = Date.now() + timeOut;
            sessionStorage.setItem('passwordTimeout', endTime.toString());
            
            //alert('Maximum login attempts reached, please wait 2 minutes and try again.');
            
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


            // Display the countdown message
            const timeRemain = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
            document.getElementById('timeout-countdown').textContent = `Time Left Until You Can Use The Form: ${timeRemain} seconds`;
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