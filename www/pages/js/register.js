
var register = {    
    register: function(){
        var lname = document.getElementById("lname").value;
        var fname = document.getElementById("fname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var address = document.getElementById("email").value;
        var mobile = document.getElementById("mobile").value;
        var emobile = document.getElementById("emobile").value;

        //UPDATETHIS
        $.ajax({
          type: "POST",
          url: config.apiUrl + "passenger/register.php",
          data: JSON.stringify({
            firstname: fname,
            lastname: lname,
            email: email,
            password: password,
            address: "Sample Address",
            mobile: mobile,
            photo: emobile,
          }),
          success: function (result) {
            ons.notification.alert({
                message: 'Registration successful! You will be redirected to login page.',
                callback: function(answer) {
                    window.location.href = "login.html";
                }
            });
          },
          error: function(error){
            ons.notification.alert("Registration failed!");
            console.log(error.responseText);
          },
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        });        
    }
};
