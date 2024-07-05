proj4.defs("EPSG:4674","+proj=longlat +ellps=GRS80 +no_defs +type=crs"); 

const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    new ol.layer.Tile({
        source: new ol.source.TileWMS({
          projection: 'EPSG:4674', // here is the source projection
          url: 'http://geo.funceme.br/geoserver/ows',
          params: {
            'LAYERS': 'geonode:ce_municipios_2022',
          },
        }),
    }),
  ],
  view: new ol.View({
    // center: ol.proj.fromLonLat([-39.5, -5.2]),
    // zoom: 8,
    // minZoom: 7,
    // maxZoom: 15
    projection: 'EPSG:3857', // here is the view projection
    center: [0, 0],
    zoom: 2,  
}),
});

// // Inserir camadas raster
// // Exemplo de camada de precipitação
// const contornoMunicipios = new ol.layer.Tile({
//     source: new ol.source.TileWMS({
//         url: 'http://geo.funceme.br/geoserver/ows',
//         params: {
//             'LAYERS': 'geonode:ce_municipios_2022',
//             'TILED': true,
//             'VERSION': '1.1.0', // Especifique a versão se necessário
//             'FORMAT': 'image/png', // Defina o formato da imagem (exemplo: image/png)
//             'SRS': 'EPSG:4674' // Sistema de referência espacial
//         },
//         serverType: 'geoserver'
//     }),
//     layerId: '1',
//     title: 'Precipitação',
//     iconClass: 'fas fa-tint' // Ícone para a camada de precipitação
// });

// // Adicionando ao grupo de camadas raster
// // contornoMunicipios.setVisible(true); // Definindo a visibilidade como false
// map.addLayer(contornoMunicipios)

