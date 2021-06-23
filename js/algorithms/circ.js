function circDict() {

    circ = {
  
      hue:{value:90, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
      sat:{value:30, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
      lit:{value:80, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0},
      xOffset:{value:0, min:-1, max:1, step:0.001, type:"range", class:"slider", calc:0},
      yOffset:{value:0, min:-1, max:1, step:0.001, type:"range", class:"slider", calc:0},
      radius:{value:0, min:0, max:0.5, step:0.001, type:"range", class:"slider", calc:0},
    }
  
    return circ;
  
  }
  
  
  
  function calc_circ( circ ) {
    //dummy function
    return circ
  }
  
  
  
  function draw_circ( circ, ctx ) {
    
    var hue = parseFloat(circ.hue.value,10);
    var sat = parseFloat(circ.sat.value,10);
    var lit = parseFloat(circ.lit.value,10);
    var xOffset = parseFloat(circ.xOffset.value,10);
    var yOffset = parseFloat(circ.yOffset.value,10);
    var radius = parseFloat(circ.radius.value,10);
  
    x = 0.5 + xOffset;
    y = 0.5 + yOffset;
    
    rad = radius;
    
    lineWidth = 0.005;
    
    fillMode = "fill";
    
    //console.log("x",x);
    //console.log("y",y);
    //console.log("rad",rad);
  
  
    var alpha = 255;
  
    drawCircle(x, y, rad, lineWidth, hue, sat, lit, alpha, fillMode, ctx);
  
  }
  
  
  
  
  
  
  
  
    