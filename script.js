const fetch = require("node-fetch");
const converter = require("length-distance-converter");
const csv = require('csv-parser');
const fs = require('fs');

function getDistance(Location) {

    var distanceSearch = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=315+6th+Ave+E+Alexandria+MN+56308&destinations=803+Central+Ave+N+Brandon+MN+56315&key=AIzaSyBsdC0E4_Rp_Jbl2m9wvO6O1xhHbxIRtlU";

    fetch(distanceSearch)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data.rows[0].elements[0].distance);
            var kilo = data.rows[0].elements[0].distance.value / 1000;
            console.log(kilo);
            var miles = converter.kmToMiles(kilo);
            console.log(miles);
            miles = Math.round(miles * 10) / 10;
            console.log(miles);
        })
};

getDistance();

