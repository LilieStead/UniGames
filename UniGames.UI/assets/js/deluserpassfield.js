// Code deletes all content from only the username and password fields in forms
// This can be used universally, but if you plan to add more, let me (Kieron) know
// and I will modify the file name and add it to github so you can add your function
function resetUser_PassFields(){
    let userInput = document.getElementById('user');
    let userPass = document.getElementById('password');
    let userPass2 = document.getElementById('password2');

    // Reset the value of the fields
    userInput.value = '';
    userPass.value = '';
    userPass2.value = '';
}


function resetReviewFields(){
    let revTitle = document.getElementById('rtitle');
    let revDesc = document.getElementById('rdesc');
    let revScore = document.getElementById('score');

    revTitle.value = '';
    revDesc.value = '';
    revScore.value = '';
}