
    var map = L.map('map').setView([40.7128,-74.0060], 4);
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);
    
    /*===================================================
                          MARKER               
    ===================================================*/
    
    var singleMarker = L.marker([28.25255,83.97669]);
    singleMarker.addTo(map);
    var popup = singleMarker.bindPopup('This is a popup')
    popup.addTo(map);
    
    /*===================================================
                         TILE LAYER               
    ===================================================*/
    
    // Google Map Layer
    
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
     });
     googleStreets.addTo(map);
    
     // Satelite Layer
    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
       maxZoom: 20,
       subdomains:['mt0','mt1','mt2','mt3']
     });
    googleSat.addTo(map);
    
    
    
    /*===================================================
                          GEOJSON               
    ===================================================*/
    var geojsonLayer = new L.GeoJSON.AJAX('[');

    L.geoJSON(geojsonFeature).addTo(map);

    /*
    var linedata = L.geoJSON(lineJSON).addTo(map);
    var pointdata = L.geoJSON(pointJSON).addTo(map);
    var nepalData = L.geoJSON(nepaldataa).addTo(map);
    var polygondata = L.geoJSON(polygonJSON,{
        onEachFeature: function(feature,layer){
            layer.bindPopup('<b>This is a </b>' + feature.properties.name)
        },
        style:{
            fillColor: 'red',
            fillOpacity:1,
            color: 'green'
        }
    }).addTo(map);
    */

    /*===================================================
                          LAYER CONTROL               
    ===================================================*/
    
    var baseLayers = {
        "Satellite":googleSat,
        "Google Map":googleStreets,
        "OpenStreetMap": osm,
    };
    
    var overlays = {
        "Marker": singleMarker,
        "PointData":pointdata,
        "LineData":linedata,
        "PolygonData":polygondata
    };
    
    L.control.layers(baseLayers, overlays).addTo(map);
    
    
    /*===================================================
                          SEARCH BUTTON               
    ===================================================*/
    
    L.Control.geocoder().addTo(map);
    
    
    /*===================================================
                          Choropleth Map               
    ===================================================*/
    /*
    L.geoJSON(statesData).addTo(map);
    
    
    function getColor(d) {
        return d > 1000 ? '#800026' :
               d > 500  ? '#BD0026' :
               d > 200  ? '#E31A1C' :
               d > 100  ? '#FC4E2A' :
               d > 50   ? '#FD8D3C' :
               d > 20   ? '#FEB24C' :
               d > 10   ? '#FED976' :
                          '#FFEDA0';
    }
    
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    
    L.geoJson(statesData, {style: style}).addTo(map);
    
    function highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    
        info.update(layer.feature.properties);
    }
    
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }
    
    var geojson;
    // ... our listeners
    geojson = L.geoJson(statesData);
    
    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }
    
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
    
    geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
    
    var info = L.control();
    
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };
    
    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
            : 'Hover over a state');
    };
    
    info.addTo(map);
    
    var legend = L.control({position: 'bottomright'});
    
    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 10, 20, 50, 100, 200, 500, 1000],
            labels = [];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
    
    legend.addTo(map);
    */
    