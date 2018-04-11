var starttrip = {
    initialize: function(){
        console.log("Get data from API");  

        var driver = document.getElementById("driverId");
        var vehicle = document.getElementById("vehicleId");
        var plate = document.getElementById("plateId");
        var origin = document.getElementById("originId");
        var dest = document.getElementById("destId");
        var cost = document.getElementById("costId");   

        driver.innerHTML = "Test";
        vehicle.innerHTML = "Test";
        plate.innerHTML = "Test";
        origin.innerHTML = "Test";
        dest.innerHTML = "Test";
        cost.innerHTML = "Test";
    },

    panicButton: function(){
        console.log("Panic button");  
    },

    endTrip: function(){
        window.location.href = "end-trip.html";  
    }
};
