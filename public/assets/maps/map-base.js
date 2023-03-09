var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, maxZoom: 20, minZoom: 7, zoomOffset: -1, attribution: mbAttr }),
    streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, maxZoom: 40, minZoom: 7, zoomOffset: -1, attribution: mbAttr });
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 15,
    minZoom: 7,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
googleLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    minZoom: 7,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var mymap = L.map('mapid', {
    // center: [-0.826779, 11.773469],
    center: [0.4176476, 9.4651490],
    zoomDelta: 0.25,
    zoomSnap: 0.25,
    zoom: 11.5,
    // dragging: false,
    // scrollWheelZoom: false,
    // zoomControl: false ,
    layers: [streets]
});
mymap.options.minZoom = 7;
mymap.options.maxZoom = 25;


// add map scale
L.control.scale({
    position: 'bottomright'
}).addTo(mymap);



// Map coordinates display
mymap.on('mousemove', function(e) {
    $('.coordinate').html(`Lat: ${e.latlng.lat}  Lng: ${e.latlng.lng}`);
});

var baseMaps = {
    "OpenStreetMap": osm,
    "Mapbox Streets": streets,
    "Satellite": googleSat,
};
var layerControl = L.control.layers(baseMaps).addTo(mymap);
