var mapDiv, infoWindow


var map = {
    initMap : function()
    {
        mapDiv = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 14.562239, lng: 121.03645},
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
            }, function () {
                map.handleLocationError(true, infoWindow, mapDiv.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            map.handleLocationError(false, infoWindow, mapDiv.getCenter());
        }
    },

    handleLocationError : function(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(mapDiv);
    }
};