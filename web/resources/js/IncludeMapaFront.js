
document.write("<script type='text/javascript' src='OpenLayer/OpenLayers.js'></script>");
var map, drawControls, saveStrategy, wfsPropiedad, selectFeature, wfsZonaInteres, selectFeatureZona, select, wmsPropiedad;
function init(){
    var google_satellite = new OpenLayers.Layer.Google("Google Satellite",{type: google.maps.MapTypeId.HYBRID});
    var proj_900913 = new OpenLayers.Projection('EPSG:900913');
    var proj_4326 = new OpenLayers.Projection('EPSG:4326');
    var posicion = new OpenLayers.LonLat(-56.71361, -34.3375);
    posicion.transform(proj_4326, proj_900913);
    map = new OpenLayers.Map('map', {projection: proj_900913 ,displayProjection: proj_4326, numZoomLevels: 20});
    var wmsEjes = new OpenLayers.Layer.WMS('Ejes de calles','http://localhost:8080/geoserver/wms/',{layers: 'Ejes'},{});
    wmsPropiedad = new OpenLayers.Layer.WMS('Propiedades','http://localhost:8080/geoserver/wms/',{layers: 'Propiedad', transparent: true},{isBaseLayer: false});
    var wmsZonaCrecimiento = new OpenLayers.Layer.WMS('Zona Interes','http://localhost:8080/geoserver/wms/',{layers: 'ZonaInteres', transparent: true},{isBaseLayer: false});
    var wmsNegocios = new OpenLayers.Layer.WMS('Comercios','http://localhost:8080/geoserver/wms/',{layers: 'negocios', transparent: true},{isBaseLayer: false});
    var wmsTransporte = new OpenLayers.Layer.WMS('Transporte ','http://localhost:8080/geoserver/wms/',{layers: 'ServTransporteRecreacion', transparent: true},{isBaseLayer: false});
    var wmsServiciosPublicos = new OpenLayers.Layer.WMS('Servicios Publicos ','http://localhost:8080/geoserver/wms/',{layers: 'ServiciosPublicos', transparent: true},{isBaseLayer: false});
    
    var filterEstado=OpenLayers.Filter.Comparison.EQUAL_TO;
    saveStrategy = new OpenLayers.Strategy.Save();
    filterStrategy = new OpenLayers.Strategy.Filter();
    wfsPropiedad = new OpenLayers.Layer.Vector('Propiedades', {
        strategies: [new OpenLayers.Strategy.BBOX, saveStrategy, filterStrategy],
        filter: new OpenLayers.Filter.Comparison({ 
            type: filterEstado,
            property: 'estado',
            value: 'Publica'
        }),
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://localhost:8080/geoserver/InmobiliariaTsig/wfs/',
            srsName: proj_900913,
            featurePrefix: 'InmobiliariaTsig',
            featureNS: 'InmobiliariaTsig',
            featureType: 'Propiedad',
            geometryName: 'the_geom',
            version: '1.1.0'
        }),
        styleMap: new OpenLayers.StyleMap(PropStyle)
    });
  
    wfsZonaInteres = new OpenLayers.Layer.Vector('Zona de Interes', {
        strategies: [new OpenLayers.Strategy.BBOX, saveStrategy],
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://localhost:8080/geoserver/InmobiliariaTsig/wfs/',
            srsName: proj_900913,
            featurePrefix: 'InmobiliariaTsig',
            featureNS: 'InmobiliariaTsig',
            featureType: 'ZonaInteres',
            geometryName: 'the_geom',
            version: '1.1.0'
        }),
        styleMap: new OpenLayers.StyleMap(ZoneStyle)
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
    }
    
    for(var key in drawControls) {
        map.addControl(drawControls[key]);
    }
    map.setCenter(posicion, 13);
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
    drawControls.select.activate();
}