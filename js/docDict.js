

// dictionary object containing the document information
// contains stuff like page width, height, dpi.

function docDict() {

    doc = {
        pageWidth:  {value:10  , min:1   , max:100  ,            type:"number", class:"number"    },
        pageHeight: {value:8   , min:1   , max:100  ,            type:"number", class:"number"    },
        // pageDPI:    {value:70  , min:1   , max:1000 ,            type:"number", class:"number"    },
        // exportDPI:  {value:150 , min:1   , max:1000 ,            type:"number", class:"number"    },
        wallHue:    {value:200 , min:0   , max:359  , step:1   , type:"range" , class:"slider-hue"},
        wallSat:    {value:10  , min:0   , max:100  , step:1   , type:"range" , class:"slider-sat"},
        wallLit:    {value:50  , min:0   , max:100  , step:1   , type:"range" , class:"slider-lit"},
        // canvasZoom: {value:0.95, min:0.10, max:5.00 , step:0.05, type:"range" , class:"slider"    },
        // setTheme:   {value:0,    min:0   , max:1    , step:1   , type:"range" , class:"on-off"    },

        wallShadowHeight:  {value:1.00, min:0, max:1  , step:0.01, type:"range", class:"slider"},
        wallShadowWidth:   {value:1.00, min:0, max:1  , step:0.01, type:"range", class:"slider"},
        wallShadowEllipseWidth: {value:1.00, min:0, max:1.2  , step:0.01, type:"range", class:"slider"},
        wallShadowBlur:    {value:0.01, min:0, max:0.1, step:0.01, type:"range", class:"slider"},
        wallShadowOpacity: {value:34  , min:0, max:100, step:1   , type:"range", class:"slider"},

        // wallWidth : {value:16  , min:1, max:100, step:1   , type:"number", class:"number"},
        // wallHeight: {value:9   , min:1, max:100, step:1   , type:"number", class:"number"},

        wallPadding : {value:0.67, min:0.01, max:1.00, step:0.01   , type:"number", class:"number"},
        yOffset     : {value:0.01, min:-0.5, max:0.5, step:0.01   , type:"number", class:"number"},

        // frameThickness     : {value:0, min:0, max:6, step:0.01   , type:"number", class:"number"},

      }

    return doc;

}