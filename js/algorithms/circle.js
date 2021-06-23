function circleDict() {

    circle = {

        xOffset:{value:0, min:-2, max:2, step:0.001, type:"range", class:"slider", calc:0},
        yOffset:{value:0, min:-2, max:2, step:0.001, type:"range", class:"slider", calc:0},

        r:{value:0.2, min:0, max:1, step:0.001, type:"range", class:"slider", calc:0},
        // r2:{value:0.2, min:0, max:1, step:0.01, type:"range", class:"slider", functionToExecute:"draw"},

        hue:{value:90, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
        sat:{value:30, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
        lit:{value:80, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0},
        alpha:{value:1, min:0, max:255, step:1, type:"range", class:"slider-lit", calc:0},

        fillMode:{value:0, min:0, max:1, step:1, type:"range", class:"on-off", calc:0},

      }

    return circle;

  }

  function calc_circle( circle ) {
    //dummy function
    return circle
  }
  
  function draw_circle( circle, ctx ) {

    // bring in parameters
    var xOffset = parseFloat( circle.xOffset.value, 10 );
    var yOffset = parseFloat( circle.yOffset.value, 10 );
    var r = parseFloat( circle.r.value, 10 );

    var hue = parseFloat( circle.hue.value, 10 );
    var sat = parseFloat( circle.sat.value, 10 );
    var lit = parseFloat( circle.lit.value, 10 );
    var alpha = parseFloat( circle.alpha.value, 10 );

    var fillMode = parseFloat( circle.fillMode.value, 10 );
    var lineWidth = 0.005;

    circle = {loc:[0.5, 0.5], rad:r};

    // fill mode
    if(fillMode==0){fillMode = "fill";}else{}

    drawCircle(circle,xOffset,yOffset,lineWidth,hue,sat,lit,alpha,fillMode,ctx)
  
  }
  
  
  
  
  
  
  
  
    