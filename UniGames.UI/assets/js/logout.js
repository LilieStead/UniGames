function logout(){
    fetch("http://localhost:5116/user/logout")
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            sessionStorage.removeItem("authToken");
            localStorage.removeItem("authTokenLocal");
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error(error);
        })
}
