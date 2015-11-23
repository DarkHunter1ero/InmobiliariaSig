function filtrar(){
    var type = OpenLayers.Filter.Comparison.LIKE;
    var attributeTipo = PF('selectTipo').value;
    var inputBarrio = document.getElementById('FormFiltros:inputBarrio').value;
    var checkVenta = PF('checkVenta').isChecked();
    var checkAlquiler = PF('checkAlquiler').isChecked();
    var checkParrilla = PF('checkParrilla').isChecked();
    var checkGarage = PF('checkGarage').isChecked();
    var checkPiscina = PF('checkPiscina').isChecked();
    var checkCalefaccion = PF('checkCalefaccion').isChecked();
    
    var filterLogical = new OpenLayers.Filter.Logical({
        type: OpenLayers.Filter.Logical.AND});
    
    var pocicionArray =0;
    
    if(attributeTipo !== undefined && attributeTipo !== "" ){
        var filterTipo = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'tipo',
            value: attributeTipo
        });
        filterLogical.filters[pocicionArray]=filterTipo;
        pocicionArray++;
    }
    
    if(inputBarrio !== undefined){
        var filterBarrio = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'barrio',
            value: inputBarrio
        });
        filterLogical.filters[pocicionArray]=filterBarrio;
        pocicionArray++;
    }
    
    if(checkVenta !== undefined && checkVenta === true ){
        var filterCompra = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'compra',
            value: checkVenta
        });
        filterLogical.filters[pocicionArray]=filterCompra;
        pocicionArray++;
    }
    
    if(checkAlquiler !== undefined && checkAlquiler === true){
        var filterAlquiler = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'alquiler',
            value: checkAlquiler
        });
        filterLogical.filters[pocicionArray]=filterAlquiler;
        pocicionArray++;
    }
    
    if(checkParrilla !== undefined && checkParrilla === true ){
        var filterParrillero = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'parrillero',
            value: checkParrilla
        });
        filterLogical.filters[pocicionArray]=filterParrillero;
        pocicionArray++;
    }
    
    if(checkGarage !== undefined && checkGarage === true){
        var filterGarage = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'garage',
            value: checkGarage
        });
        filterLogical.filters[pocicionArray]=filterGarage;
        pocicionArray++;
    }
    
    if(checkPiscina !== undefined && checkPiscina === true){
        var filterPiscina = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'piscina',
            value: checkPiscina
        });
        filterLogical.filters[pocicionArray]=filterPiscina;
        pocicionArray++;
    }
    
    if(checkCalefaccion !== undefined && checkCalefaccion === true ){
        var filterCalefaccion = new OpenLayers.Filter.Comparison({
            type: type,
            property: 'calefaccio',
            value: checkCalefaccion
        });
        filterLogical.filters[pocicionArray]=filterCalefaccion;
        pocicionArray++;
    }
    
    
    filterStrategy.setFilter(filterLogical);
    filterStrategy.activate(); 
    wfsPropiedad.refresh({force: true});
    wfsPropiedad.redraw();
}