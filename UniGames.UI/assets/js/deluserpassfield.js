// Code deletes all content from only the username and password fields in forms
function resetUser_PassFields(){
    let userInput = document.getElementById('user');
    let userPass = document.getElementById('password');

    // Reset the value of the fields
    userInput.value = '';
    userPass.value = '';
}