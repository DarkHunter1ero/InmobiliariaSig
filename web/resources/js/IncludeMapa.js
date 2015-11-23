
document.write("<script type='text/javascript' src='OpenLayer/OpenLayers.js'></script>");
var map, drawControls, saveStrategy, wfsPropiedad, selectFeature, wfsZonaInteres, selectFeatureZona, proj_900913, proj_4326, posicion;
var wfsNroPuerta, saveStrategyPoligon;
OpenLayers.Feature.Vector.style['default']['strokeWidth'] = '2';
function init(){
    var google_satellite = new OpenLayers.Layer.Google("Google Satellite",{type: google.maps.MapTypeId.HYBRID});
    proj_900913 = new OpenLayers.Projection('EPSG:900913');
    proj_4326 = new OpenLayers.Projection('EPSG:4326');
    posicion = new OpenLayers.LonLat(-56.71361, -34.3375);
    posicion.transform(proj_4326, proj_900913);
    map = new OpenLayers.Map('map', {projection: proj_900913 ,displayProjection: proj_4326, numZoomLevels: 20});
    var wmsEjes = new OpenLayers.Layer.WMS('Ejes de calles','http://localhost:8080/geoserver/wms/',{layers: 'Ejes'},{});
    var wmsNegocios = new OpenLayers.Layer.WMS('Comercios','http://localhost:8080/geoserver/wms/',{layers: 'negocios', transparent: true},{isBaseLayer: false});
    var wmsTransporte = new OpenLayers.Layer.WMS('Transporte ','http://localhost:8080/geoserver/wms/',{layers: 'ServTransporteRecreacion', transparent: true},{isBaseLayer: false});
    var wmsServiciosPublicos = new OpenLayers.Layer.WMS('Servicios Publicos ','http://localhost:8080/geoserver/wms/',{layers: 'ServiciosPublicos', transparent: true},{isBaseLayer: false});
    
    saveStrategy = new OpenLayers.Strategy.Save();
    saveStrategyPoligon = new OpenLayers.Strategy.Save();
    filterStrategy = new OpenLayers.Strategy.Filter();
    wfsPropiedad = new OpenLayers.Layer.Vector('Propiedades', {
        strategies: [new OpenLayers.Strategy.BBOX, saveStrategy, filterStrategy],
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://localhost:8080/geoserver/InmobiliariaTsig/wfs/',
            srsName: proj_900913,
            featurePrefix: 'InmobiliariaTsig',
            featureNS: 'InmobiliariaTsig',
            featureType: 'Propiedad',
            geometryName: 'the_geom',
            version: '1.1.0'
        }),
        styleMap: new OpenLayers.StyleMap({'default': PropStyle})
    });
    
    
    wfsZonaInteres = new OpenLayers.Layer.Vector('Zona de Interes', {
        strategies: [new OpenLayers.Strategy.BBOX, saveStrategyPoligon],
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://localhost:8080/geoserver/InmobiliariaTsig/wfs/',
            srsName: proj_900913,
            featurePrefix: 'InmobiliariaTsig',
            featureNS: 'InmobiliariaTsig',
            featureType: 'ZonaInteres',
            geometryName: 'the_geom',
            version: '1.1.0'
        }),
        styleMap: new OpenLayers.StyleMap({'default':ZoneStyle})
    });
    
    wfsNroPuerta = new OpenLayers.Layer.Vector('Propiedades', {
        strategies: [new OpenLayers.Strategy.Fixed],
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://localhost:8080/geoserver/InmobiliariaTsig/wfs/',
            srsName: proj_900913,
            featurePrefix: 'InmobiliariaTsig',
            featureNS: 'InmobiliariaTsig',
            featureType: 'San_Jose_num_puertas',
            geometryName: 'the_geom',
            version: '1.1.0'
        })
    });
    
    map.addLayers([google_satellite, wmsEjes, wfsZonaInteres, wfsPropiedad, wmsNegocios, wmsTransporte, wmsServiciosPublicos]);
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    
    drawControls = {
        point: new OpenLayers.Control.DrawFeature(
                wfsPropiedad, OpenLayers.Handler.Point
                ),
        //line: new OpenLayers.Control.DrawFeature(
        //        vectors, OpenLayers.Handler.Path
        //       ),
        polygon: new OpenLayers.Control.DrawFeature(
                wfsZonaInteres, OpenLayers.Handler.Polygon
                ),
        select: new OpenLayers.Control.SelectFeature(
                wfsPropiedad,
        {
            clickout: false, toggle: false,
            multiple: false, hover: false,
            toggleKey: "ctrlKey", // ctrl key removes from selection
            multipleKey: "shiftKey", // shift key adds to selection
            onSelect: cargarDatosPropiedad,
            onUnselect: closePopUp
        }
                ),
        delete: new OpenLayers.Control.SelectFeature(
                wfsPropiedad,
        {
            clickout: false, toggle: false,
            multiple: false, hover: false,
            toggleKey: "ctrlKey", // ctrl key removes from selection
            multipleKey: "shiftKey", // shift key adds to selection
            onSelect: cargarDatosPropiedad
        }
                ),
        deleteZona: new OpenLayers.Control.SelectFeature(
                wfsZonaInteres,
        {
            clickout: false, toggle: false,
            multiple: false, hover: false,
            toggleKey: "ctrlKey", // ctrl key removes from selection
            multipleKey: "shiftKey", // shift key adds to selection
            onSelect: cargarZona
        }
                )
    };
    
    
    function cargarDatosPropiedad(feature){
        
        var popup = new OpenLayers.Popup.FramedCloud("activeAlarm",
        feature.geometry.getBounds().getCenterLonLat(),
        new OpenLayers.Size(100,100),
        "<div> estado: "+feature.attributes['estado']+"</div></br>"+
                "<div> direccion: "+feature.attributes['direccion']+"</div></br>"+
                "<div> alquiler: "+feature.attributes['alquiler']+"</div></br>"+
                "<div> venta: "+feature.attributes['compra']+"</div></br>"+
                "<div> barrio: "+feature.attributes['barrio']+"</div></br>"+
                "<div> precio: "+feature.attributes['precio']+"</div></br>"+
                "<div> cantDormit: "+feature.attributes['cantDormit']+"</div></br>"+
                "<div> banio: "+feature.attributes['cantBanio']+"</div></br>"+
                "<div> m2construido: "+feature.attributes['construido']+"</div></br>"+
                "<div> m2terreno: "+feature.attributes['padronM2']+"</div></br>"+
                "<div> parrillero: "+feature.attributes['parrillero']+"</div></br>"+
                "<div> garage: "+feature.attributes['garage']+"</div></br>"+
                "<div> piscina: "+feature.attributes['piscina']+"</div></br>"+
                "<div> calefaccion: "+feature.attributes['calefaccion']+"</div></br>"+
                "<div> tipo: "+feature.attributes['tipo']+"</div></br>"+
                "<div> Detalle: <a href='#' onclick='propiedadUnica();'>click me</a></div></br>",
        null, true );
        feature.popup = popup;
        //        popup.setOpacity(0.7);
        map.addPopup(popup);
        
        selectFeature = [feature];
        
        PF('selectEstado').selectValue(feature.attributes['estado']);
        document.getElementById('FormPropiedad:direccion').value = feature.attributes['direccion'];
        if(feature.attributes['alquiler'] === 'TRUE'){
            PF('selectAlquiler').check();
        }else{
            PF('selectAlquiler').uncheck();
        }
        if(feature.attributes['compra'] === 'TRUE'){
            PF('selectVenta').check();
        }else{
            PF('selectVenta').uncheck();
        }
        document.getElementById('FormPropiedad:barrio').value = feature.attributes['barrio'];
        document.getElementById('FormPropiedad:precio').value = feature.attributes['precio'];
        document.getElementById('FormPropiedad:dormitorio').value = feature.attributes['cantDormit'];
        document.getElementById('FormPropiedad:banio').value = feature.attributes['cantBanio'];
        document.getElementById('FormPropiedad:m2construido').value = feature.attributes['construido'];
        document.getElementById('FormPropiedad:m2terreno').value = feature.attributes['padronM2'];
        if(feature.attributes['parrillero'] === 'TRUE'){
            PF('selectParrilla').check();
        }else{
            PF('selectParrilla').uncheck();
        }
        if(feature.attributes['garage'] === 'TRUE'){
            PF('selectGarage').check();
        }else{
            PF('selectGarage').uncheck();
        }
        if(feature.attributes['piscina'] === 'TRUE'){
            PF('selectPiscina').check();
        }else{
            PF('selectPiscina').uncheck();
        }
        if(feature.attributes['calefaccio'] === 'TRUE'){
            PF('selectCalefaccion').check();
        }else{
            PF('selectCalefaccion').uncheck();
        }
        document.getElementById('FormPropiedad:text').value = feature.fid;
        PF('selecttipo').selectValue(feature.attributes['tipo']);
        
    }
    
    function cargarZona(feature){
        selectFeatureZona = [feature];
    }
    
    //    function featAdded() {
    //        $('#FormPropiedad\\:text').val(drawControls.point.handler.point.geometry.x+", "+drawControls.point.handler.point.geometry.y);
    //        
    //        document.getElementById('FormPropiedad:hdnBtn').click();
    //    }
    
    function featAdded(event) {
        
        var el = document.getElementById('FormPropiedad:text');
        
        var lonLat = event.geometry.getBounds().getCenterLonLat().clone().transform(proj_900913, proj_4326);
        
        var coord_x = lonLat.lon.toFixed(9);
        var coord_y = lonLat.lat.toFixed(9);
        var coord1 = proj4('+proj=longlat +datum=WGS84 +no_defs', '+proj=utm +zone=21 +south +datum=WGS84 +units=m +no_defs', [coord_x, coord_y]);
        el.value=coord1[0]+", "+coord1[1];
        
        document.getElementById('FormPropiedad:hdnBtn').click();
    }
    
    drawControls.point.featureAdded = featAdded;
    
    for(var key in drawControls) {
        map.addControl(drawControls[key]);
    }
    map.setCenter(posicion, 13);
    
}

function dibujarPropiedad(){
    selectFeature = null;
    desactivarControles();
    drawControls.point.activate();
}

function resetTipo(){
    filterStrategy.setFilter("");  
    wfsPropiedad.refresh({force: true});
    wfsPropiedad.redraw();
}

function seleccionarPropiedad(){
    desactivarControles();
    drawControls.select.activate();
}

function crearZonaInteres(){
    selectFeatureZona = null;
    desactivarControles();
    drawControls.polygon.activate();
}

function eliminarPropiedad(){
    desactivarControles();
    drawControls.delete.activate();
}

function eliminarZona(){
    desactivarControles();
    drawControls.deleteZona.activate();
}

function desactivarControles(){
    if(drawControls.point.active){
        drawControls.point.deactivate();
    }
    if(drawControls.select.active){
        drawControls.select.deactivate();
    }
    if(drawControls.delete.active){
        drawControls.delete.deactivate();
    }
    if(drawControls.polygon.active){
        drawControls.polygon.deactivate();
    }
    if(drawControls.deleteZona.active){
        drawControls.deleteZona.deactivate();
    }
}

function accion(feature){
    if(drawControls.select.active){
        modificarPropiedad(feature);
    }else if(drawControls.point.active){
        crearPropiedad();
    }else if(drawControls.delete.active){
        deletePropiedad();
    }else if(drawControls.polygon.active){
        zonaCrecimiento();
    }else if(drawControls.deleteZona.active){
        EliminarZonaCrecimiento();
    }
}

function closePopUp(feature){
    if(feature.popup) {
        map.removePopup(feature.popup);
        feature.popup.destroy();
        delete feature.popup;
    }
}

function propiedadUnica(){
    
    var direccion = selectFeature[0].attributes['direccion'];
    
    var filterPropiedad = new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'direccion',
        value: direccion
    });
    
    filterStrategy.setFilter(filterPropiedad);
    filterStrategy.activate();
    wfsPropiedad.refresh({force: true});
    wfsPropiedad.redraw();
    closePopUp(selectFeature[0]);
    var posicionProp = new OpenLayers.LonLat(selectFeature[0].geometry.x, selectFeature[0].geometry.y);
    map.setCenter(posicionProp, 17);
}