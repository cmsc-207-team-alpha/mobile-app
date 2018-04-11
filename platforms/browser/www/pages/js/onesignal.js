var onesignal = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {        
        var notificationOpenedCallback = function(jsonData) {
		    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
		;

	  	window.plugins.OneSignal
		    .startInit("d2097cc3-fb04-4981-806b-19c87aabc868")
		    .handleNotificationOpened(notificationOpenedCallback)
		    .endInit();
	    }
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
    driverTripAlert: function() {
    	//PASS TRIP ID
    	var id = 39;
    	driverride.driverTripAlert(id);
    	console.log("OS driverTripAlert");
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



