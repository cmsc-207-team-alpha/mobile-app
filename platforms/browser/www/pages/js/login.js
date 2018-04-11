
var login = {

    email : document.getElementById("email"),
    password : document.getElementById("password"),
    id : 0,
    login: function(){
        $.ajax({
        type: "POST",
        url: config.apiUrl + "passenger/authenticate.php",
        data: JSON.stringify({
            email: login.email.value,
            password: login.password.value
        }),
        success: function (result) {
            //API to return ID
            //login.id = result["id"];
            window.location.href = "ride-request.html";            
        },
        error: function(error){
            ons.notification.alert("Login failed!");
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json"
        });        
    },

    loginAsDriver: function(){
        $.ajax({
        type: "POST",
        url: config.apiUrl + "driver/authenticate.php",
        data: JSON.stringify({
            email: login.email.value,
            password: login.password.value
        }),
        success: function (result) {
            login.id = result["id"];
            window.location.href = "driver-ride-request.html?id=" + login.id;            
        },
        error: function(error){
            ons.notification.alert("Login failed!");
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json"
        });        
    }
};
