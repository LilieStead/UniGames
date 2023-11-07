// Code deletes all content from only the username and password fields in forms
// This can be used universally, but if you plan to add more, let me (Kieron) know
// and I will modify the file name and add it to github so you can add your function
function resetUser_PassFields(){
    let userInput = document.getElementById('user');
    let userPass = document.getElementById('password');

    // Reset the value of the fields
    userInput.value = '';
    userPass.value = '';
}