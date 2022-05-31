var map = L.map('map').setView([39.554957608503614, 2.6978474556721475], 25);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaXJlbmVtYWNoYWRvIiwiYSI6ImNpdXFxd3I0cDAwMGMyem84eWV5Z2JuYmoifQ.il-n8cxWQmXkvBAHqVVcdg'
}).addTo(map);

var marker = L.marker([39.554957608503614, 2.6978474556721475]).addTo(map);
marker.bindPopup("<b>Biblioteca Coll d'en Rabassa</b>").openPopup();
