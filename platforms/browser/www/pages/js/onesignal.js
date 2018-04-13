var onesignal = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        var notificationReceiveCallback = function(jsonData) {  
            if(jsonData["payload"]["title"] === "Trip assigned!"){
                onesignal.driverTripAlert(jsonData["payload"]["additionalData"]["tripid"]);
            }
        };

	  	window.plugins.OneSignal
		    .startInit("d2097cc3-fb04-4981-806b-19c87aabc868")
            .handleNotificationReceived(notificationReceiveCallback)
            .endInit();    
    },


    //FUNCTIONS
    driverAcceptTrip: function(id) {
    	//PUSH MESSAGE TO PASSENGER INCLUDE TRIP ID

    	console.log("OS driverAcceptTrip");
    },

    driverStartTrip: function() {
    	//PUSH MESSAGE TO PASSENGER INCLUDE TRIP ID

    	console.log("OS driverStartTrip");
    },

    driverEndTrip: function() {
    	//PUSH MESSAGE TO PASSENGER INCLUDE TRIP ID

    	console.log("OS driverEndTrip");
    },


    //EVENTS
    driverTripAlert: function(id) {
        driverride.tripid = id;
        driverride.getTrip(1); 
    },

    passengerRideAccepted: function() {


    	riderrequest.rideAccepted();
    	console.log("OS rideAccepted");
    },

    passengerTripStarted: function() {


    	pendingride.passengerTripStarted();
    	console.log("OS passengerTripStarted");
    },

    passengerTripEnded: function() {


    	pendingride.passengerTripEnded();
    	console.log("OS passengerTripEnded");
    }
};



