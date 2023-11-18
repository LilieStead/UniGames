function modifySuccess(message){
    // Gets the ID of a specific div (contains all main content in this case)
    const replaceDiv = document.getElementById('mainsize');
    // Replaces the HTML code within to nothing/blank
    replaceDiv.innerHTML = '';
    // Gets the success message from the function invoke
    const successMessage = message;
    // Defines the success content (grabbed from success.html)
    const successContent = 
    `<div id="contenttitle" class="Successmsg success">
        <h1>Success!</h1>
        <p id="success-message">${successMessage}</p>
        <div class="flex-container">
            <a class="Successmsglink" href="index.html"><p id="retsucc">Return to home page</p></a>
        </div>
    </div>`;
    // Adds the success content into the div
    replaceDiv.innerHTML = successContent;
}