var basemaps = {
    // Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
    //     layers: 'TOPO-WMS'
    // }),

    // Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
    //     layers: 'OSM-Overlay-WMS'
    // }),

    // 'Topography, then places': L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
    //     layers: 'TOPO-WMS,OSM-Overlay-WMS'
    // }),

    LimitesMunicipais: L.tileLayer.wms('http://geo.funceme.br/geoserver/ows', {
        layers: 'geonode:ce_municipios_2022' // Precisa ser adicionado o EPSG:4674
    })
};

// L.control.layers(basemaps).addTo(map);

// basemaps.LimitesMunicipais.addTo(map);