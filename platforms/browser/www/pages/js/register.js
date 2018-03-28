var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    
        console.log('Received Event: ' + id);
    },

    listUser: function () {         
        $.ajax({
                type: "GET",
                url: "https://cmsc-207-team-alpha.000webhostapp.com/api/driver/get.php",         
                success: function (result) {
                    var names = "";
                    $.each(result, function (index, element) {
                        names += ' ' + element['firstname'];                     
                    });
                    ons.notification.alert(names , {
                        title: "Name of users: "
                    });
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json"
        });
    },

    register: function(){
        $.ajax({
          type: "POST",
          url: "https://cmsc-207-team-alpha.000webhostapp.com/api/driver/register.php",
          data: JSON.stringify({
            firstname: "mobile test",
            lastname: "mobile test",
            email: "mobile test",
            password: "mobile test",
            address: "mobile test",
            mobile: "mobile test",
            photo: "mobile test",
          }),
          success: function (result) {
            console.log('Success');
          },
          error: function(error){
            console.log(error.responseText);
          },
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        });
    }
};
