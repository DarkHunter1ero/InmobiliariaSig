
document.write("<script type='text/javascript' src='OpenLayer/OpenLayers.js'></script>");
var map, drawControls, saveStrategy, wfsPropiedad, selectFeature, wfsZonaInteres, selectFeatureZona;

OpenLayers.Feature.Vector.style['default']['strokeWidth'] = '2';
function init(){
    var google_satellite = new OpenLayers.Layer.Google("Google Satellite",{type: google.maps.MapTypeId.HYBRID});
    var proj_900913 = new OpenLayers.Projection('EPSG:900913');
    var proj_4326 = new OpenLayers.Projection('EPSG:4326');
    var posicion = new OpenLayers.LonLat(-56.71361, -34.3375);
    posicion.transform(proj_4326, proj_900913);
    map = new OpenLayers.Map('map', {projection: proj_900913 ,displayProjection: proj_4326, numZoomLevels: 20});
    var wmsEjes = new OpenLayers.Layer.WMS('Ejes de calles','http://localhost:8080/geoserver/wms/',{layers: 'Ejes'},{});
    var wmsPropiedad = new OpenLayers.Layer.WMS('Propiedades','http://localhost:8080/geoserver/wms/',{layers: 'Propiedad', transparent: true},{isBaseLayer: false});
    var wmsZonaCrecimiento = new OpenLayers.Layer.WMS('Zona Interes','http://localhost:8080/geoserver/wms/',{layers: 'ZonaInteres', transparent: true},{isBaseLayer: false});
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
        })
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
        })
    });
    
    map.addLayers([google_satellite, wmsZonaCrecimiento, wmsEjes, wmsPropiedad, wfsZonaInteres, wfsPropiedad, wmsNegocios, wmsTransporte, wmsServiciosPublicos]);
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
    
    function closePopUp(feature){
        if(feature.popup) {
            map.removePopup(feature.popup);
            feature.popup.destroy();
            delete feature.popup;
            map.redraw();
        }
    }
    
    function cargarDatosPropiedad(feature){
        
        var popup = new OpenLayers.Popup.FramedCloud("activeAlarm",
        feature.geometry.getBounds().getCenterLonLat(),
        new OpenLayers.Size(100,100),
        "<div> estado: "+feature.attributes['estado']+"</div></br>"+
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
                "<div> tipo: "+feature.attributes['tipo']+"</div></br>",
        null, true );
        feature.popup = popup;
        //        popup.setOpacity(0.7);
        map.addPopup(popup);
        
        selectFeature = [feature];
        
        PF('selectEstado').selectValue(feature.attributes['estado']);
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
    
    function featAdded() {
        
//        var el = document.getElementById('FormPropiedad:text');
//        
//        /*  if(wfsPropiedad.features.length > 1){
//                            wfsPropiedad.removeFeatures(wfsPropiedad.features[0]);   
//                        }*/
//        el.value=drawControls.point.handler.point.geometry.x+", "+drawControls.point.handler.point.geometry.y;
        
        $('#FormPropiedad\\:text').val(drawControls.point.handler.point.geometry.x+", "+drawControls.point.handler.point.geometry.y);
        
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

function filtroTipo(){
    
    var type = OpenLayers.Filter.Comparison.LIKE;
    attributeTipo = PF('selectTipo').value;
    if(attributeTipo !== undefined || attributeTipo !== "" ){
        
        var filterTipo = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'tipo',
            value: attributeTipo
        });
 
    }
    var filterAlquiler;
    var filterVenta;
    var venta = "FALSE";
    var alquiler = "FALSE";
    var attributeTransaccion = PF('selectVentaAlquiler').value;
    
    if(attributeTransaccion !== undefined || attributeTransaccion !== ""){
 
        if(attributeTransaccion === "VentaAlquiler"){

            alquiler = "TRUE";
            venta = "TRUE";
        }
        
        if(attributeTransaccion === "Alquiler" || alquiler === "TRUE"){
            alquiler = "TRUE";
        }else{
            alquiler = "FALSE"; 
        }

        if(attributeTransaccion === "Venta" || venta === "TRUE"){
            venta = "TRUE";
        }else{
            venta = "FALSE";
        }
       
        var filterAlquiler = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'alquiler',
            value: alquiler
        });

        var filterVenta = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'compra',
            value: venta
        });
            
        var filterVentaAlquiler = new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters: [filterVenta, filterAlquiler]});
 
    }
    if(attributeTipo !== undefined && attributeTransaccion !== undefined || attributeTipo !== "" && attributeTransaccion !== "" ){
        var filterLogical = new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters: [filterTipo, filterVentaAlquiler]});
    }
    if(attributeTipo !== undefined && attributeTransaccion === undefined || attributeTipo !== "" && attributeTransaccion === ""){
        var filterLogical = new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters: [filterTipo]});
    }
    
    if(attributeTipo === undefined && attributeTransaccion !== undefined || attributeTipo === "" && attributeTransaccion !== ""){
        var filterLogical = new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters: [filterVentaAlquiler]});
    }

    filterStrategy.setFilter(filterLogical);
    filterStrategy.activate(); 
    wfsPropiedad.refresh({force: true});
    wfsPropiedad.redraw();
    
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

function crearPropiedad(){
    
    var estado = PF('selectEstado').value;
    
    var alquiler;
    if(PF('selectAlquiler').isChecked()){
        alquiler = 'TRUE';
    }else{
        alquiler = 'FALSE';
    }
    var venta;               
    if(PF('selectVenta').isChecked()){
        venta = 'TRUE';
    }else{
        venta = 'FALSE';
    }
    var barrio = document.getElementById('FormPropiedad:barrio').value;
    var precio = document.getElementById('FormPropiedad:precio').value;
    var dormitorio = document.getElementById('FormPropiedad:dormitorio').value;
    var banio = document.getElementById('FormPropiedad:banio').value;
    var m2construido = document.getElementById('FormPropiedad:m2construido').value;
    var m2terreno = document.getElementById('FormPropiedad:m2terreno').value;
    
    var parrilla;
    if(PF('selectParrilla').isChecked()){
        parrilla = 'TRUE';
    }else{
        parrilla = 'FALSE';
    }
    var garage;
    if(PF('selectGarage').isChecked()){
        garage = 'TRUE';
    }else{
        garage = 'FALSE';
    }              
    var piscina;
    if(PF('selectPiscina').isChecked()){
        piscina = 'TRUE';
    }else{
        piscina = 'FALSE';
    }                
    var calefaccion;
    if(PF('selectCalefaccion').isChecked()){
        calefaccion = 'TRUE';
    }else{
        calefaccion = 'FALSE';
    } 
    var tipo = PF('selecttipo').value;
    
    var tamanio = wfsPropiedad.features.length;
    var features = wfsPropiedad.features;
    var feature = features[tamanio-1];
    
    feature.attributes.state = OpenLayers.State.INSERT;
    feature.attributes['estado'] = estado;
    feature.attributes['alquiler'] = alquiler;
    feature.attributes['compra'] = venta;
    feature.attributes['barrio'] = barrio;
    feature.attributes['precio'] = precio;
    feature.attributes['cantDormit'] = dormitorio;
    feature.attributes['cantBanio'] = banio;
    feature.attributes['construido'] = m2construido;
    feature.attributes['padronM2'] = m2terreno;
    feature.attributes['parrillero'] = parrilla;
    feature.attributes['garage'] = garage;
    feature.attributes['piscina'] = piscina;
    feature.attributes['calefaccio'] = calefaccion;
    feature.attributes['tipo'] = tipo;
    
    saveStrategy.save();
    document.load();
}

function modificarPropiedad(){
    var estado = PF('selectEstado').value;
    
    var alquiler;
    if(PF('selectAlquiler').isChecked()){
        alquiler = 'TRUE';
    }else{
        alquiler = 'FALSE';
    }
    var venta;               
    if(PF('selectVenta').isChecked()){
        venta = 'TRUE';
    }else{
        venta = 'FALSE';
    }
    var barrio = document.getElementById('FormPropiedad:barrio').value;
    var precio = document.getElementById('FormPropiedad:precio').value;
    var dormitorio = document.getElementById('FormPropiedad:dormitorio').value;
    var banio = document.getElementById('FormPropiedad:banio').value;
    var m2construido = document.getElementById('FormPropiedad:m2construido').value;
    var m2terreno = document.getElementById('FormPropiedad:m2terreno').value;
    var fid = document.getElementById('FormPropiedad:text').value;
    var parrilla;
    if(PF('selectParrilla').isChecked()){
        parrilla = 'TRUE';
    }else{
        parrilla = 'FALSE';
    }
    var garage;
    if(PF('selectGarage').isChecked()){
        garage = 'TRUE';
    }else{
        garage = 'FALSE';
    }              
    var piscina;
    if(PF('selectPiscina').isChecked()){
        piscina = 'TRUE';
    }else{
        piscina = 'FALSE';
    }                
    var calefaccion;
    if(PF('selectCalefaccion').isChecked()){
        calefaccion = 'TRUE';
    }else{
        calefaccion = 'FALSE';
    } 
    var tipo = PF('selecttipo').value;
    
    var feature = selectFeature[0];
    
    feature.attributes['estado'] = estado;
    feature.attributes['alquiler'] = alquiler;
    feature.attributes['compra'] = venta;
    feature.attributes['barrio'] = barrio;
    feature.attributes['precio'] = precio;
    feature.attributes['cantDormit'] = dormitorio;
    feature.attributes['cantBanio'] = banio;
    feature.attributes['construido'] = m2construido;
    feature.attributes['padronM2'] = m2terreno;
    feature.attributes['parrillero'] = parrilla;
    feature.attributes['garage'] = garage;
    feature.attributes['piscina'] = piscina;
    feature.attributes['calefaccio'] = calefaccion;
    feature.attributes['tipo'] = tipo;
    
    feature.state = OpenLayers.State.UPDATE;
    
    saveStrategy.save();
    document.load();
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

function deletePropiedad(){
    seleccionarPropiedad();
    var feature = selectFeature[0];
    feature.state = OpenLayers.State.DELETE;
    saveStrategy.save();
    document.load();
}

function EliminarZonaCrecimiento(){
    var feature = selectFeatureZona[0];
    feature.state = OpenLayers.State.DELETE;
    saveStrategyPoligon.save();
    document.load();
}

function zonaCrecimiento(){
    var demanda = PF('selectdemanda').value;
    var tamanio = wfsZonaInteres.features.length;
    var features = wfsZonaInteres.features;
    var feature = features[tamanio-1];
    
    feature.attributes.state = OpenLayers.State.INSERT;
    feature.attributes['tipo'] = demanda;
    saveStrategyPoligon.save();
    document.load();
        
}
