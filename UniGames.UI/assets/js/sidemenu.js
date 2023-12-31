function getUsername(){
  const userIDSess = sessionStorage.getItem('authToken');
  const userIDLocal = localStorage.getItem('authTokenLocal');
  const authToken = JSON.parse(userIDLocal);
  var idType;

  if (userIDSess){
      idType = "session";
  } else{
      idType = "local";
  }

  const apiURL = idType === 'session'
  ? `http://localhost:5116/user/decodeToken?jwtToken=${userIDSess}`
  : `http://localhost:5116/user/decodeToken?jwtToken=${authToken.value}`;
  fetch(apiURL)
  .then(response => {
    if (response.status === 200){
      return response.json()
    }else if (response.status === 400){
      console.error("Token cannot be decoded, server has likely restarted... Logging out user");
      sessionStorage.removeItem("authToken");
      localStorage.removeItem("authTokenLocal");
      window.location.href = "index.html";
    }
  })
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