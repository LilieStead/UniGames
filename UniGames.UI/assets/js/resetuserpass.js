// Function to reset the user password
function resetPassword(event){
    event.preventDefault();
    // Use the built-in FormData method to get the form data
    const formDataUser = new FormData(document.getElementById('resetpassform'));

    // Get all of the form data and store them to variables -- Const so they cannot be changed
    const userName = formDataUser.get('Username');
    const userEmail = formDataUser.get('Useremail');
    const userPhone = formDataUser.get('Userphone');
    //const oldpass = formData.get('UserpasswordOld')
    const newPassActual = formDataUser.get('Userpassword');
    const newPass2 = formDataUser.get('UserPasswordAgain');
    if (newPassActual !== newPass2){
        console.error('Passwords do not match');
        const error_message = document.getElementById('password2error');
        error_message.innerHTML = "Passwords do not match, please try again";
        return;
    }
    if (newPassActual === newPass2){
        const error_message = document.getElementById('password2error');
        error_message.innerHTML = "";
    }
    //const data = {
        //Userpassword: newPassActual,
    //};

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
        else{
            console.log('Error: ', response.status);
        }
    })
    .then(data => {
        console.log('API Response: ', data);
        // Add code to go to success page or update current page with success
        //window.location.href = "success.html?success=5";
    })
    .catch(error => {
        console.error('Error: ', error);
        // Add code to append an error to the page for the user to see (potentially with
        // The loading logo applied to the page)
    })
    
    

    


}



// Event listener to find the button click
document.getElementById('resetpassform').addEventListener('submit', resetPassword);