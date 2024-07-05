// // proj4.defs("EPSG:4674","+proj=longlat +ellps=GRS80 +no_defs +type=crs");

// // extent = [
// //   -122.19,
// //   -59.87,
// //   -25.28,
// //   32.72
// // ];
// // ol.proj.proj4.register(proj4)
// // const projection = new ol.proj.Projection({
// //   axisOrientation: 'neu',
// //   code: 'EPSG:4674',
// //   units: 'degrees'
// // })
// // ol.proj.addProjection(projection);

// // ol.proj.get('EPSG:4674').setExtent(extent);
// proj4.defs("EPSG:4258","+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs");
// ol.proj.proj4.register(proj4);

// console.log(ol.proj.get('EPSG:4258'));


// var projection = new ol.proj.Projection({
//   axisOrientation: 'neu',
//   code: 'EPSG:4258',
//   units: 'degrees'
// });     
// ol.proj.addProjection(projection);
// console.log(ol.proj.get('EPSG:4258'));


// const map = new ol.Map({
//   target: 'map',
//   layers: [
//     new ol.layer.Tile({
//       source: new ol.source.OSM()
//     }),
//     new ol.layer.Tile({
//         source: new ol.source.TileWMS({
//           projection: 'EPSG:4326', // here is the source projection
//           url: 'http://geo.funceme.br/geoserver/ows',
//           params: {
//             'LAYERS': 'geonode:teste_unidades_mapeamento_com_ordem_sub_ordem__dados_solos_com',
//             'VERSION': '1.0.0'
//           }
//         }),
//     }),
//     // new ol.layer.Tile({
//     //   source: new ol.source.TileWMS({
//     //     url: 'https://ows.terrestris.de/osm/service',
//     //     params: {'LAYERS': 'OSM-WMS'},
//     //     ratio: 1,
//     //     serverType: 'geoserver'
//     //   })
//     // })
//   ],
//   view: new ol.View({
//     // center: ol.proj.fromLonLat([-39.5, -5.2]),
//     // zoom: 8,
//     // minZoom: 7,
//     // maxZoom: 15,
//     projection: 'EPSG:4326', // here is the view projection
//     center: [0, 0],
//     zoom: 2,  
//     // center: [-39.5, -5.2],
//     // extent: extent,
//     // projection: 'EPSG:4674',
//     // zoom: 7,
//     // projection: 'EPSG:4258',
//     // extent: [-16.1, 32.88, 40.18, 84.17]
// }),
// });
// // map.getView().fit([-16.1, 32.88, 40.18, 84.17]);

// // // Inserir camadas raster
// // // Exemplo de camada de precipitação
// // const contornoMunicipios = new ol.layer.Tile({
// //     source: new ol.source.TileWMS({
// //         url: 'http://geo.funceme.br/geoserver/ows',
// //         params: {
// //             'LAYERS': 'geonode:ce_municipios_2022',
// //             'TILED': true,
// //             'VERSION': '1.1.0', // Especifique a versão se necessário
// //             'FORMAT': 'image/png', // Defina o formato da imagem (exemplo: image/png)
// //             'SRS': 'EPSG:4674' // Sistema de referência espacial
// //         },
// //         serverType: 'geoserver'
// //     }),
// //     layerId: '1',
// //     title: 'Precipitação',
// //     iconClass: 'fas fa-tint' // Ícone para a camada de precipitação
// // });

// // // Adicionando ao grupo de camadas raster
// // // contornoMunicipios.setVisible(true); // Definindo a visibilidade como false
// // map.addLayer(contornoMunicipios)

// Transparent Proj4js support:
//
// EPSG:21781 is known to Proj4js because its definition is registered by
// calling proj4.defs(). Now when we create an ol/proj/Projection instance with
// the 'EPSG:21781' code, OpenLayers will pick up the transform functions from
// Proj4js. To get the registered ol/proj/Projection instance with other
// parameters like units and axis orientation applied from Proj4js, use
// `ol/proj#get('EPSG:21781')`.
//
// Note that we are setting the projection's extent here, which is used to
// determine the view resolution for zoom level 0. Recommended values for a
// projection's validity extent can be found at https://epsg.io/.

proj4.defs(
  'EPSG:21781',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
    '+x_0=600000 +y_0=200000 +ellps=bessel ' +
    '+towgs84=660.077,13.551,369.344,2.484,1.783,2.939,5.66 +units=m +no_defs',
);
ol.proj.proj4.register(proj4);

const projection = new ol.proj.Projection({
  code: 'EPSG:21781',
  extent: [485869.5728, 76443.1884, 837076.5648, 299941.7864],
});

const extent = [420000, 30000, 900000, 350000];
const layers = [
  new ol.layer.Image({
    extent: extent,
    source: new ol.source.ImageWMS({
      url: 'https://wms.geo.admin.ch/',
      crossOrigin: 'anonymous',
      attributions:
        '© <a href="https://shop.swisstopo.admin.ch/en/products/maps/national/lk1000"' +
        'target="_blank">Pixelmap 1:1000000 / geo.admin.ch</a>',
      params: {
        'LAYERS': 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
        'FORMAT': 'image/jpeg',
      },
      serverType: 'mapserver',
    }),
  }),
  new ol.layer.Image({
    extent: extent,
    source: new ol.source.ImageWMS({
      url: 'https://wms.geo.admin.ch/',
      crossOrigin: 'anonymous',
      attributions:
        '© <a href="https://www.hydrodaten.admin.ch/en/notes-on-the-flood-alert-maps.html"' +
        'target="_blank">Flood Alert / geo.admin.ch</a>',
      params: {'LAYERS': 'ch.bafu.hydroweb-warnkarte_national'},
      serverType: 'mapserver',
    }),
  }),
];

const map = new ol.Map({
  // controls: ol.control.defaults().extend([new ol.controls.ScaleLine()]),
  layers: layers,
  target: 'map',
  view: new ol.View({
    projection: projection,
    center: ol.proj.fromLonLat([8.23, 46.86], projection),
    extent: extent,
    zoom: 2,
  }),
});