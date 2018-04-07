var mapDiv, infoWindow;

var map = {
    initMap: function () {
        mapDiv = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 14.562239, lng: 121.03645 },
            zoom: 15
        });
        infoWindow = new google.maps.InfoWindow;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.' + ' ' + position.coords.latitude + ' ' + position.coords.longitude);
                infoWindow.open(mapDiv);
                mapDiv.setCenter(pos);
                watchPicturePosition();
            }, function () {
                map.handleLocationError(true, infoWindow, mapDiv.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            map.handleLocationError(false, infoWindow, mapDiv.getCenter());
        }
    },

    getLocation: function () {
        var position = null;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.' + ' ' + position.coords.latitude + ' ' + position.coords.longitude);
                infoWindow.open(mapDiv);
                mapDiv.setCenter(pos);
                watchPicturePosition();

                console.log(pos);
                return pos;
            }, function () {
                map.handleLocationError(true, infoWindow, mapDiv.getCenter());
                return position;
            });
        } else {
            map.handleLocationError(false, infoWindow, mapDiv.getCenter());
            return position;
        }
    },

    handleLocationError: function (browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(mapDiv);
    },

    plotOrigin: function(searchValue){
        //PLOT ORIGIN
        //RETURN LAT, LON
        console.log(searchValue);
        return {lat: 30.58899, lon: 31.975238};
    },

    plotDestination: function(searchValue){
        //PLOT DESTINATION        
        //RETURN LAT, LON
        console.log(searchValue);
        return {lat: 3, lon: 4};
    },

    computeDistance: function(origin, dest){
        //GET DISTANCE
        //WHAT IS NEEDED TO GET THIS?
        return {dist: 3, time: 4};
    },
};



// WATCH POSITION CODES
// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
function onSuccess(position) {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.' + ' ' + position.coords.latitude + ' ' + position.coords.longitude);
    infoWindow.open(mapDiv);
    mapDiv.setCenter(pos);
}

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Options: throw an error if no update is received every 30 seconds.
function watchPicturePosition() {
    return navigator.geolocation.watchPosition
        (onSuccess, onError, {
            enableHighAccuracy: true,
            timeout: 30000
        });
}