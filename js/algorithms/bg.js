
function bgDict() { 
    bg = { 
        hue:{default:90, min:0, max:359, step:1, class:"slider-hue"},
        sat:{default:30, min:0, max:100, step:1, class:"slider-sat"},
        lit:{default:80, min:0, max:100, step:1, class:"slider-lit"},
    } 
    return bg;
}


function draw_bg( paramValues, layer, ctx ) {
    
    var hue = paramValues[0]; 
    var sat = paramValues[1]; 
    var lit = paramValues[2]; 

    ctx.rect(0,0,w,h);

    //console.log("paramValues",paramValues);

    ctx.fillStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)';

    ctx.fill();
}