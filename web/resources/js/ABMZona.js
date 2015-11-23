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