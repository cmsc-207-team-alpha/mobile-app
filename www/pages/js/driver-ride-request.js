var driverride = {

    header: document.getElementById("headerId"),
    origin: document.getElementById("originId"),
    dest: document.getElementById("destId"),
    cost: document.getElementById("costId"),

    tripid:0,
    driverid:0,
    vehicleid:0,

    driverName:'',
    plateNo:'',
    carDetails:'',
    
    initialize: function(){        
        var parameterValue = decodeURIComponent(window.location.search.match(/(\?|&)id\=([^&]*)/)[2]); 
        driverride.driverid = parameterValue; 
        driverride.noRequest();  
        driverride.bindEvents();  
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {  
        driverride.getVehicle();
        driverride.getDriver();
    },

    noRequest: function(){
        driverride.header.innerHTML = "Waiting for Ride Request...";
        driverride.origin.innerHTML = "";
        driverride.dest.innerHTML = "";
        driverride.cost.innerHTML = "";

        var alert = document.getElementById("alert");
        alert.style.visibility = 'visible';

        var start = document.getElementById("start");
        start.style.visibility = 'hidden';

        var end = document.getElementById("end");
        end.style.visibility = 'hidden';
    },

    showDriverDetails: function(){
        driverride.header.innerHTML = "Waiting for Ride Request...";
        driverride.origin.innerHTML = "<br />Driver: " + driverride.driverName;
        driverride.dest.innerHTML = "<br />Vehicle: " + driverride.carDetails;
        driverride.cost.innerHTML = "<br />Plate Number: " + driverride.plateNo;
    },

    accept: function(){
        $.ajax({
            type: "POST",
            url: config.apiUrl + "trip/accept.php",
            data: JSON.stringify({
                id: driverride.tripid
            }),
            success: function (result) {
                ons.notification.alert(result["message"]);
                onesignal.driverAcceptTrip(driverride.tripid);
                driverride.getTrip(2);

                var alert = document.getElementById("alert");
                alert.style.visibility = 'hidden';

                var start = document.getElementById("start");
                start.style.visibility = 'visible';

                var end = document.getElementById("end");
                end.style.visibility = 'hidden';
            },
            error: function(error){
                ons.notification.alert("Encountered error!");
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
            });   
    },

    cancel: function(){
        $.ajax({
            type: "POST",
            url: config.apiUrl + "trip/reject.php",
            data: JSON.stringify({
                id: driverride.tripid
            }),
            success: function (result) {
                ons.notification.alert(result["message"]);
            },
            error: function(error){
                ons.notification.alert("Encountered error!");
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
            });   
    },

    getVehicle: function(){
        $.ajax({
            type: "GET",
            url: config.apiUrl + "vehicle/get.php",
            data: {
                driverid: driverride.driverid
            },
            success: function (result) { 
                if(result.length > 0)
                {   
                    driverride.vehicleid = result[0]["id"];
                    driverride.plateNo = result[0]["plateno"];
                    driverride.carDetails =result[0]["make"] + " : " + result[0]["model"];
                    driverride.updateVehicleStatus();
                    driverride.showDriverDetails();
                }
                else
                {
                    driverride.plateNo = 'NA';
                    driverride.carDetails = 'NA';
                    ons.notification.alert("No vehicle registered to this account.");
                }
            },
            error: function(error){
                ons.notification.alert("Encountered error!");
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
            });   
    },

    getDriver: function(){
        $.ajax({
            type: "GET",
            url: config.apiUrl + "driver/get.php",
            data: {
                id: driverride.driverid
            },
            success: function (result) { 
                driverride.driverName = result["firstname"] + " " + result["lastname"];
                driverride.showDriverDetails();             
            },
            error: function(error){
                ons.notification.alert("Encountered error!");
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
            });   
    },

    getTrip: function(mode){
        $.ajax({
            type: "GET",
            url: config.apiUrl + "trip/get.php",
            data: {
                id: driverride.tripid
            },
            success: function (result) {    
               if(mode === 1){
                    driverride.alertTrip(result);
               }
               else if (mode === 2){
                    driverride.showTrip(result);
               }
            },
            error: function(error){
                ons.notification.alert("Encountered error!");
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
            });   
    },

    updateVehicleStatus: function(){
        $.ajax({
            type: "POST",
            url: config.apiUrl + "vehicle/updatestatus.php",
            data: JSON.stringify({
                id: driverride.vehicleid,
                available: 1,
                active: 1
            }),
            success: function (result) {
                console.log(result["message"]);
            },
            error: function(error){
                ons.notification.alert("Encountered error!");
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
            });   
    },

    showTrip: function(result){
        driverride.header.innerHTML = "Accepted Ride";
        driverride.origin.innerHTML = "<br />Origin: " + result["source"];
        driverride.dest.innerHTML = "<br />Destination: " + result["destination"];
        driverride.cost.innerHTML = "<br />Cost: " + result["amount"];

        //{ lat: result["sourcelat"], lng: result["sourcelong"] }
        map.searchRoute(result["source"], result["destination"]);
    },

    alertTrip: function(result){
        ons.notification.confirm({
        message: 'Ride Request Alert! <br /><br />'+
                ' <br />Origin: ' + result["source"] +
                ' <br />Destination: '+ result["destination"] +
                ' <br />Cost: '+ result["amount"],
        callback: function(idx) {
        switch (idx) {
          case 0:
            driverride.cancel();
            break;
          case 1:
            driverride.accept();
            break;
        }
        }});
    },

    startTrip: function(){
        $.ajax({
        type: "POST",
        url: config.apiUrl + "trip/start.php",
        data: JSON.stringify({
            id: driverride.tripid
        }),
        success: function (result) {
            ons.notification.alert(result["message"]);
            onesignal.driverStartTrip(driverride.tripid);

            driverride.header.innerHTML = "Trip Started";

            var alert = document.getElementById("alert");
            alert.style.visibility = 'hidden';

            var start = document.getElementById("start");
            start.style.visibility = 'hidden';

            var end = document.getElementById("end");
            end.style.visibility = 'visible';
        },
        error: function(error){
            ons.notification.alert("Encountered error!");
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json"
        });   
    },

    endTrip: function(){
        $.ajax({
        type: "POST",
        url: config.apiUrl + "trip/end.php",
        data: JSON.stringify({
            id: driverride.tripid
        }),
        success: function (result) {
            ons.notification.alert(result["message"]);
            onesignal.driverEndTrip(driverride.tripid);

            driverride.noRequest();
            driverride.showDriverDetails();  
        },
        error: function(error){
            ons.notification.alert("Encountered error!");
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json"
        });   
    },

    driverTripAlert: function(id){        

        ons.notification.prompt({ message: 'Trip ID:' })
        .then(function(idx) {
            driverride.tripid = idx;
            driverride.getTrip(1); 
        });
         
    }
};
