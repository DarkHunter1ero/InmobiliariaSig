function crearPropiedad(){
    
    var direccion = document.getElementById('FormPropiedad:direccion').value;
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
    feature.attributes['direccion'] = direccion;
    
    saveStrategy.save();
    document.load();
}

function modificarPropiedad(){
    var direccion = document.getElementById('FormPropiedad:direccion').value;
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
    feature.attributes['direccion'] = direccion;
    
    feature.state = OpenLayers.State.UPDATE;
    
    saveStrategy.save();
    document.load();
}            

function deletePropiedad(){
    seleccionarPropiedad();
    var feature = selectFeature[0];
    feature.state = OpenLayers.State.DELETE;
    saveStrategy.save();
    document.load();
}