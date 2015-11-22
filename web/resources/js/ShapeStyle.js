var PropStyle = new OpenLayers.Style(
            // the first argument is a base symbolizer
    // all other symbolizers in rules will extend this one
    {
        graphicWidth: 40,
        graphicHeight: 40,
        label: "asdasdasd" // label will be foo attribute value
    },
    // the second argument will include all rules
    {
        rules: [
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "tipo",
                    value: "Casa"
                }),
                symbolizer: {fillColor: 'blueviolet',
		    fillOpacity: 1,
		    strokeColor: 'black',
		    strokeWidth: 1,
                    //		    strokeOpacity: 0.1,
		    label: '',
		    fontFamily: 'Arial',
		    fontStyle: 'Normal',
		    fontSize: '11',
		    fontColor: 'black',
		    pointRadius: 8,
		    cursor: 'hand',
		    labelAlign: 'cm',
		    labelXOffset: '10',
		    labelYOffset: '20',
                    externalGraphic: "../resources/image/Icono_casa.png"
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "tipo",
                    value: "Apartamento"
                }),
                symbolizer: {fillColor: 'red',
		    fillOpacity: 1,
		    strokeColor: 'black',
		    strokeWidth: 1,
		    strokeOpacity: 0.7,
		    label: '',
		    fontFamily: 'Arial',
		    fontStyle: 'Normal',
		    fontSize: '11',
		    fontColor: 'black',
		    pointRadius: 8,
		    cursor: 'hand',
		    labelAlign: 'cm',
		    labelXOffset: '10',
		    labelYOffset: '20',
                    externalGraphic: "../resources/image/Icono_Apto.png"
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "tipo",
                    value: "Terreno",
                }),
                symbolizer: {fillColor: 'darkorange',
                    fillOpacity: 1,
                    strokeColor: 'black',
                    strokeWidth: 1,
                    strokeOpacity: 0.7,
                    label: '',
                    fontFamily: 'Arial',
                    fontStyle: 'Normal',
                    fontSize: '11',
                    fontColor: 'black',
                    pointRadius: 8,
                    cursor: 'hand',
                    labelAlign: 'cm',
                    labelXOffset: '10',
                    labelYOffset: '20',
                    externalGraphic: "../resources/image/icono-Terreno.png"
                }
            })
        ]
    }
            );
    
    
    var ZoneStyle = new OpenLayers.Style(
            // the first argument is a base symbolizer
    // all other symbolizers in rules will extend this one
    {
        graphicWidth: 40,
        graphicHeight: 40,
        label: "asdasdasd" // label will be foo attribute value
    },
    // the second argument will include all rules
    {
        rules: [
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "tipo",
                    value: "Baja"
                }),
                symbolizer: {fillColor: 'red',
		    fillOpacity: 0.5,
		    strokeColor: 'black',
		    strokeWidth: 1,
                    //		    strokeOpacity: 0.1,
		    label: '',
		    fontFamily: 'Arial',
		    fontStyle: 'Normal',
		    fontSize: '11',
		    fontColor: 'black',
		    pointRadius: 8,
		    cursor: 'hand',
		    labelAlign: 'cm',
		    labelXOffset: '10',
		    labelYOffset: '20'
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "tipo",
                    value: "Media"
                }),
                symbolizer: {fillColor: 'yellow',
		    fillOpacity: 0.5,
		    strokeColor: 'black',
		    strokeWidth: 1,
		    strokeOpacity: 0.7,
		    label: '',
		    fontFamily: 'Arial',
		    fontStyle: 'Normal',
		    fontSize: '11',
		    fontColor: 'black',
		    pointRadius: 8,
		    cursor: 'hand',
		    labelAlign: 'cm',
		    labelXOffset: '10',
		    labelYOffset: '20'
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "tipo",
                    value: "Alta"
                }),
                symbolizer: {fillColor: 'green',
                    fillOpacity: 0.5,
                    strokeColor: 'black',
                    strokeWidth: 1,
                    strokeOpacity: 0.7,
                    label: '',
                    fontFamily: 'Arial',
                    fontStyle: 'Normal',
                    fontSize: '11',
                    fontColor: 'black',
                    pointRadius: 8,
                    cursor: 'hand',
                    labelAlign: 'cm',
                    labelXOffset: '10',
                    labelYOffset: '20'
                }
            })
        ]
    }
            );
    