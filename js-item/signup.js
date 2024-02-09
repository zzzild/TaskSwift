document.getElementById("signup").addEventListener("click", function() {
    var username = document.getElementById("signupUsername").value;
    var password = document.getElementById("signupPassword").value;

    if (localStorage.getItem("users") === null) {
        var users = [];
    } else {
        var users = JSON.parse(localStorage.getItem("users"));
    }

    users.push({ username: username, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("message").innerText = "Signup successful. You can now log in.";
    document.getElementById('message').style.color ='green';

    window.location.href = "login.html";
});
