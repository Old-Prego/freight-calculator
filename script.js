const fetch = require("node-fetch");
const converter = require("length-distance-converter");
const csv = require('csv-parser');
const fs = require('fs');
const locations = [];

function loadCSV() {
    fs.createReadStream('IMPORT.csv')
        .pipe(csv())
        .on('data', (data) => locations.push(data))
        .on('end', () => {
            locations.forEach(function(element, index) {
                var words = element.LOCATION.split(' ');
                var loc = words.join('+');
                locations[index] = loc;
            })

            getDistance(locations);
        });
}

function getDistance(locations) {

    // TODO: Add for each to loop through locations making calls for every index
    // TODO: Then, add returns to array and write to the CSV file

    var distanceSearch = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + locations + "&destinations=803+Central+Ave+N+Brandon+MN+56315&key=AIzaSyBsdC0E4_Rp_Jbl2m9wvO6O1xhHbxIRtlU";
    console.log(distanceSearch);
    fetch(distanceSearch)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log(data.rows[0].elements[0].distance);
            var kilo = data.rows[0].elements[0].distance.value / 1000;
            console.log(kilo);
            var miles = converter.kmToMiles(kilo);
            console.log(miles);
            miles = Math.round(miles * 10) / 10;
            console.log(miles);
        })
};

// getDistance();
loadCSV();

