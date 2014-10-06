---
---
{% include js/mapbox-2.1.0.min.js %}
{% include js/leaflet-markercluster-0.4.0.min.js %}

$(function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoiZ3JhZmEiLCJhIjoiU2U2QnIzUSJ9.4LnG05Ptvi1sUQ8t68rfgw';
    var map = L.mapbox.map('map', null, {
      touchZoom: false, 
      scrollWheelZoom: false,
      zoomControl: false,
      worldCopyJump: true
    }).setView([39.774769485295465,-84.55078125], 3);

    // swap out layers and token periodically
    var myLayer = L.tileLayer('http://api.tiles.mapbox.com/v4/grafa.88128171/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ3JhZmEiLCJhIjoiU2U2QnIzUSJ9.4LnG05Ptvi1sUQ8t68rfgw')
        .addTo(map);

    L.control.zoom()
      .setPosition('bottomleft')
      .addTo(map);

    var chapters = L.geoJson( {{ site.data.chapters | jsonify }}, {
      onEachFeature: function (feature, layer) {
        var popupContent = '<h2>'+ feature.properties.title +'</h2>' + 'Twitter: ' + 
          '<a href="http://twitter.com/' + feature.properties.twitter + '" target="_blank">@' + feature.properties.twitter +'</a>';
        layer.bindPopup(popupContent);
        layer.setIcon(new L.Icon({
          iconUrl:'/img/maptime-marker.png',
          iconSize: [24,24],
          iconAnchor: [6,12],
          popupAnchor: [5,-10]
        }));
      }
    });

    var clusterGroup = new L.MarkerClusterGroup({
      showCoverageOnHover: false, 
      maxClusterRadius: 30
    });

    clusterGroup.addLayer(chapters);
    
    map.addLayer(clusterGroup);
});