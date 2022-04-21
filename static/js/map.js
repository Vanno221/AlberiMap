var map = L.map('map').fitWorld();
map.locate({setView: true, maxZoom: 16});

/*##############################################################################################
                                            MAP LAYER                                           
###############################################################################################*/

/*
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 18,
    subdomains:['mt0','mt1','mt2','mt3']
 }).addTo(map);
*/

/* Open Street Map */
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);


/*
var wmsLayers = {
    'Mappa Alberi Comune Firenze': L.tileLayer.wms("http://tms.comune.fi.it/tiles/service/wms?",{
    layers: "sivep:alberi_pubblici_ComuneFI",
    format: 'image/png', transparent: true,
    })};

L.control.layers({osm}, wmsLayers).addTo(map);
*/


/*##############################################################################################
                                            GEOJSON                                        
###############################################################################################*/

var geojsonFeatureCollection = {"type":"FeatureCollection", "features": [
    {"type":"Feature","geometry":{"type":"Point","coordinates":[1684996.13000488,4848185.5]},"properties":{"ID":42484,"CODSITO_AL":33062,"QUARTIERE":"3","SPECIE":"Clerodendrum","NOME_COMUN":"clerodendro","CIRCONF_CM":20}},
    {"type":"Feature","geometry":{"type":"Point","coordinates":[1684999.51000977,4848185.05999756]},"properties":{"ID":42487,"CODSITO_AL":33063,"QUARTIERE":"3","SPECIE":"Clerodendrum","NOME_COMUN":"clerodendro","CIRCONF_CM":20}}]};


L.geoJSON(geojsonFeatureCollection, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: function (feature, osm) {
        if (feature.properties) {
            osm.bindPopup(feature.properties.NOME_COMUN);
        }
    }
}).addTo(map);

/*##############################################################################################
                                            MARKER
###############################################################################################*/

var singleMarker = L.marker([51.5, -0.09]).addTo(map);

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

var geojsonMarkerOptions = {
    radius: 500,
    fillColor: "#ff7800",
    color: 'green',
    fillOpacity: 0.5
};


/*##############################################################################################
                                            POPUP
###############################################################################################*/

singleMarker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");


/*##############################################################################################
                                            POPUP LAYER
###############################################################################################*/

var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);



/*##############################################################################################
                                            ICON    
###############################################################################################*/

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: '../img/leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

var greenIcon = new LeafIcon({iconUrl: '../img/leaf-green.png'}),
    redIcon = new LeafIcon({iconUrl: '../img/leaf-red.png'}),
    orangeIcon = new LeafIcon({iconUrl: '../img/leaf-orange.png'});

L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map).bindPopup("I am a green leaf.");
L.marker([51.495, -0.083], {icon: redIcon}).addTo(map).bindPopup("I am a red leaf.");
L.marker([51.49, -0.1], {icon: orangeIcon}).addTo(map).bindPopup("I am an orange leaf.");


/*##############################################################################################
                                            EVENT
###############################################################################################*/

function onMapClick(e) {

    var popup = L.popup()
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);

    //alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);


/*##############################################################################################
                                            LOCATION
###############################################################################################*/

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);