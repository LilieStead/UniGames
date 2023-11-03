// Create an attempts counter with a set timeout duration
/*let passAttempts = 0;
const maxAttempts = 5;
const timeOut = 7000;
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
        resetPassword();
        
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
})*/




// Function to reset the user password
function resetPassword(event){
    event.preventDefault();
    
    
    // Use the built-in FormData method to get the form data
    const formDataUser = new FormData(document.getElementById('resetpassform'));

    if (formDataUser.entries === ''){
        console.log("No Entries");
        return;
    }

    // Get all of the form data and store them to variables -- Const so they cannot be changed
    const userName = formDataUser.get('Username');
    const userEmail = formDataUser.get('Useremail');
    const userPhone = formDataUser.get('Userphone');
    //const oldpass = formData.get('UserpasswordOld')
    const newPassActual = formDataUser.get('Userpassword');
    const newPass2 = formDataUser.get('UserPasswordAgain');
    if (newPassActual !== newPass2){
        const error_message = document.getElementById('password2error');
        
        error_message.innerHTML = "Passwords do not match, please try again";
        passwordTimeout();
        
        return;
    }
    if (newPassActual === newPass2){
        const error_message = document.getElementById('password2error');
        error_message.innerHTML = "";
    }
    const data = {
        Userpassword: newPassActual
    }

    // Fetches the correct API endpoint needed
    fetch(`http://localhost:5116/reset-password/${userName}/${userEmail}/${userPhone}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.status === 200){
            console.log('User Authenticated');
            return response.json();
        }
        else if (response.status === 400){
            console.log('Phone Number Is Incorrect For Current User');
            // Code needs adding to add an error to the page -- To do soon
            return; // for now
        }
        else if (response.status === 401){
            console.log('User\'s Email Address Does Not Match Current Records');
            return; // for now
        }
        else if (response.status === 404){
            console.log('API Endpoint Not Found (Is The API Turned Off?');
            
        }
        else{
            console.log('Error: ', response.status);
        }
    })
    .then(data => {
        console.log('API Response: ', data);
        // Add code to go to success page or update current page with success
        // Currently causes issues -- Similar fix needed alongside createreview.js
        //window.location.href = "assets/inc/success.html?success=5";
    })
    .catch(error => {
        console.error('Error: ', error);
        // Add code to append an error to the page for the user to see (potentially with
        // The loading logo applied to the page)
    })
    
    

    


}



// Event listener to find the button click
document.getElementById('resetpassform').addEventListener('submit', resetPassword);