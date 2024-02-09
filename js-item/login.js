document.addEventListener("DOMContentLoaded", function() {

    let storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        window.location.href = "loading.html";
    }
});

document.getElementById("login").addEventListener("click", function() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    if (!username || !password) {
        document.getElementById('message').innerText = "Please enter both username and password.";
        document.getElementById('message').style.color ='red';
        return;
    }

    if (localStorage.getItem("users") === null) {
        document.getElementById('message').innerText = "You need to sign up first."
        document.getElementById('message').style.color ='red';
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));
    let userFound = false;

    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            userFound = true;
            break;
        }
    }

    if (userFound) {
        document.getElementById("message").innerText = "Login successful.";
        document.getElementById('message').style.color ='green';

        var userData = {
            username: username,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        window.location.href = "loading.html";
    } else {
        document.getElementById("message").innerText = "Invalid username or password.";
        document.getElementById('message').style.color ='red';
    }
});











