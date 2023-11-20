function getUsername(){
  const userIDSess = sessionStorage.getItem('authToken');
  const userIDLocal = localStorage.getItem('authTokenLocal');
  const apiURL = userIDSess
  ? `http://localhost:5116/user/decodeToken?jwtToken=${userIDSess}`
  : userIDLocal
  ?`http://localhost:5116/user/decodeToken?jwtToken=${userIDLocal}`
  : null;
  fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    const username = data.username;

    const findUserElement = document.getElementById('userNameSide');

    findUserElement.innerHTML = username;
  })
  .catch(error => {
    console.error("error:" , error);
  })
}




function toggleMenu() {
  var arrow = document.getElementById("menuarrow")
    var menu = document.getElementById("hamburgerMenu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
    if (menu.style.display === "none"){
      arrow.innerHTML = ("null");
      arrow.innerHTML = ('<i class="fa fa-caret-down" aria-hidden="true"></i>');
    }else {
      arrow.innerHTML = ("null");
      arrow.innerHTML = ('<i class="fa fa-caret-up" aria-hidden="true"></i>');
    }
  }
  
getUsername();