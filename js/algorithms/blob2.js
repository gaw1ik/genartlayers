function blobDict() {

    blob = {

        x0:{value:0.5, min:0, max:1, step:0.01, type:"range", class:"slider", calc:0},
        y0:{value:0.5, min:0, max:1, step:0.01, type:"range", class:"slider", calc:0},

        r:{value:0.2, min:0, max:1, step:0.01, type:"range", class:"slider", calc:0},

        nSegs:{value:3, min:1, max:36, step:1, type:"range", class:"slider", calc:1},

        variation:{value:0, min:0, max:0.1, step:0.001, type:"range", class:"slider", calc:1},
        // r2:{value:0.2, min:0, max:1, step:0.01, type:"range", class:"slider", functionToExecute:"draw"},

        hue:{value:90, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
        sat:{value:30, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
        lit:{value:80, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0},

        fillMode:{value:0, min:0, max:1, step:1, type:"range", class:"on-off", calc:0},

        referencePointsOn:{value:0, min:0, max:1, step:1, type:"range", class:"on-off", calc:0},

      }

    return blob;

  }

  function calc_blob( blob ) {
    //dummy function
    return blob
  }
  
  function draw_blob( blob, ctx ) {

    // bring in parameters
    var x0 = parseFloat( blob.x0.value, 10 );
    var y0 = parseFloat( blob.y0.value, 10 );
    var r = parseFloat( blob.r.value, 10 );

    var hue = parseFloat( blob.hue.value, 10 );
    var sat = parseFloat( blob.sat.value, 10 );
    var lit = parseFloat( blob.lit.value, 10 );

    var fillMode = parseFloat( blob.fillMode.value, 10 );
    var lineWidth = 0.005;

    var referencePointsOn = parseFloat( blob.referencePointsOn.value, 10 );

    var nSegs = parseFloat( blob.nSegs.value, 10 );

    var variation = parseFloat( blob.variation.value, 10 );

    // blob = {loc:[0.5, 0.5], rad:r};

    let bezierPath = [];

    var xOffset = 0;
    var yOffset = 0;

    

    // useful constants
    var sqrt2 = (2)**0.5;


    // // get bezierPath starting point
    // var thetaR = i * (Math.PI*2)/nSegs;
    // var x1_start = x0 + r*Math.cos(thetaR);
    // var y1_start = y0 + r*Math.sin(thetaR);


    // var maxAmount = 0.01;

    for(let i=0; i<nSegs; i++) {

        var thetaR = i * (Math.PI*2)/nSegs;

        var x1 = x0 + r*Math.cos(thetaR);
        var y1 = y0 + r*Math.sin(thetaR);

    
        thetaR = thetaR + (Math.PI*2)/(nSegs*3);

        var factor = 2/(3)**0.5;

        var xc1 = x0 + r*factor*Math.cos(thetaR);
        var yc1 = y0 + r*factor*Math.sin(thetaR);

    
        thetaR = (i+1) * (Math.PI*2)/nSegs;

        var x2 = x0 + r*Math.cos(thetaR);
        var y2 = y0 + r*Math.sin(thetaR);


        thetaR = thetaR - (Math.PI*2)/(nSegs*3);

        var xc2 = x0 + r*factor*Math.cos(thetaR);
        var yc2 = y0 + r*factor*Math.sin(thetaR);

        // x1  = plusOrMinusRange(x1 , variation);
        // y1  = plusOrMinusRange(y1 , variation);
        xc1 = plusOrMinusRange(xc1, variation);
        yc1 = plusOrMinusRange(yc1, variation);
        xc2 = plusOrMinusRange(xc2, variation);
        yc2 = plusOrMinusRange(yc2, variation);
        // x2  = plusOrMinusRange(x2 , variation);
        // y2  = plusOrMinusRange(y2 , variation);

        if(i==0){
            curve = [ [x1,y1], [xc1,yc1], [xc2,yc2], [x2,y2] ];
            x1_start = x1;
            y1_start = y1;
        } else if (i==nSegs-1) {
            curve = [ [x1,y1], [xc1,yc1], [xc2,yc2], [x1_start,y1_start] ];
        } else {
            curve = [ [x1,y1], [xc1,yc1], [xc2,yc2], [x2,y2] ];
        }
        
    
        bezierPath.push(curve);

    }



    // fill mode
    if(fillMode==0){fillMode = "fill";}else{}

    ctx.stroke();

    drawBezierPath(bezierPath,xOffset,yOffset,lineWidth,hue,sat,lit,fillMode,referencePointsOn,ctx);
  
  }
  
  
  
  
  
  
  
  
    