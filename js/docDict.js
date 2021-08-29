

// dictionary object containing the document information
// contains stuff like page width, height, dpi.

function docDict() {

    doc = {
        pageWidth:  {default:10  , min:1   , max:100  ,            type:"number", class:"number"    },
        pageHeight: {default:8   , min:1   , max:100  ,            type:"number", class:"number"    },

        xOrigin: {class:"number", type:"number", default:0.50, min:-1.00, max:1.00, step:"0.01"},
        yOrigin: {class:"number", type:"number", default:0.50, min:-1.00, max:1.00, step:"0.01"},
        // pageDPI:    {value:70  , min:1   , max:1000 ,            type:"number", class:"number"    },
        // exportDPI:  {value:150 , min:1   , max:1000 ,            type:"number", class:"number"    },
        wallHue:    {default:200 , min:0   , max:359  , step:1   , type:"range" , class:"slider-hue"},
        wallSat:    {default:10  , min:0   , max:100  , step:1   , type:"range" , class:"slider-sat"},
        wallLit:    {default:50  , min:0   , max:100  , step:1   , type:"range" , class:"slider-lit"},
        // canvasZoom: {value:0.95, min:0.10, max:5.00 , step:0.05, type:"range" , class:"slider"    },
        // setTheme:   {value:0,    min:0   , max:1    , step:1   , type:"range" , class:"on-off"    },

        wallShadowHeight:  {default:1.00, min:0, max:1  , step:0.01, type:"range", class:"slider"},
        wallShadowWidth:   {default:1.00, min:0, max:1  , step:0.01, type:"range", class:"slider"},
        wallShadowEllipseWidth: {default:1.00, min:0, max:1.2  , step:0.01, type:"range", class:"slider"},
        wallShadowBlur:    {default:0.01, min:0, max:0.1, step:0.01, type:"range", class:"slider"},
        wallShadowOpacity: {default:34  , min:0, max:100, step:1   , type:"range", class:"slider"},

        // wallWidth : {value:16  , min:1, max:100, step:1   , type:"number", class:"number"},
        // wallHeight: {value:9   , min:1, max:100, step:1   , type:"number", class:"number"},

        wallPadding : {default:0.67, min:0.01, max:1.00, step:0.01   , type:"number", class:"number"},
        yOffset     : {default:0.01, min:-0.5, max:0.5, step:0.01   , type:"number", class:"number"},

        // frameThickness     : {value:0, min:0, max:6, step:0.01   , type:"number", class:"number"},

      }

    return doc;

}