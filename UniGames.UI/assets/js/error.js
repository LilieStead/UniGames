function modifyError(message){
    // Gets the ID of a specific div (contains all main content in this case)
    const replaceDiv = document.getElementById('mainsize');

    const orgCont = replaceDiv.innerHTML;
    // Replaces the HTML code within to nothing/blank
    replaceDiv.innerHTML = '';
    // Gets the error message from the function invoke
    const errorMessage = message;
    // Defines the error content (grabbed from error.html)
    const errorContent = 
    `<div id="contenttitle">
        <h1>Error</h1>
    </div>
    <p id="error-message">${errorMessage}</p>
    <div class="flexcontainer">
        <button id="errorbackbut">Go Back</button>
    </div>`;
    // Adds the error content into the div
    replaceDiv.innerHTML = errorContent;

    const button = document.getElementById('errorbackbut');
    button.addEventListener('click', function(){
        replaceDiv.innerHTML = orgCont;
    })
}