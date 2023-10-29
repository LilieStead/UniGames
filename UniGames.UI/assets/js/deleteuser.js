function deleteUser(event){
    event.preventDefault();

    const formData = new FormData(document.getElementById("deleteuser"));

    const username = formData.get('Username');
    const password = formData.get('Userpassword');

    // Get UserID by Username
    fetch(`http://localhost:5116/user/${username}/${password}`)
        .then(response => {
            if (response.status === 200){
                console.log("User authenticated");

                return response.json();
            } else if (response.status === 404){
                // User is not found
                window.location.href = "error.html?error=2";
            }
            else if (response.status === 401){
                // Password is incorrect
                window.location.href = "error.html?error=1";
            }
            else if (response.status === 400){
                console.log("User Has Created Reviews");
                window.location.href = "error.html?error=3"
            }
            else{
                console.error("error", response.status);
            }
        })
        .then(data => {
            const userID = data.userId;
            
            data.UserID = userID;

            fetch(`http://localhost:5116/delete/${userID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (response.status === 200){
                    console.log("User Authenticated")

                    return response.json();
                }
                if (response.status === 400){
                    window.location.href = "error.html?error=3"
                }
                
                else{
                    console.error("error", response.status);
                }

            })
            .then(data => {
                console.log("API Response: ", data)
                window.location.href = "assets/inc/success.html?success=2"
            })

            .catch(error => {
                console.error("Error:", error);
            });
            
            
        })
        
        .catch(error => {
            console.error("Error:", error);
        });

           
}


document.getElementById("deleteuser").addEventListener("submit", deleteUser);