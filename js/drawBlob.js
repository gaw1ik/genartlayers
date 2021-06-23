function drawBlob( blob, xOffset,yOffset, lineWidth, hue,sat,lit, fillMode, referencePointsOn, ctx ) {

    // bring in parameters
    var x0 = blob.loc[0];
    var y0 = blob.loc[1];
    var r  = blob.rad;


    var nSegs = blob.nSegs;

    var variation = blob.variation;


    ///////////////////////////////////////////////////

    let bezierPath = [];

    // var xOffset = 0;
    // var yOffset = 0;


    // useful constants
    var sqrt2 = (2)**0.5;


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

        var amount = variation * r;
        xc1 = plusOrMinusRange(xc1, amount);
        yc1 = plusOrMinusRange(yc1, amount);
        xc2 = plusOrMinusRange(xc2, amount);
        yc2 = plusOrMinusRange(yc2, amount);
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

    // ctx.stroke();

    drawBezierPath(bezierPath,xOffset,yOffset,lineWidth,hue,sat,lit,fillMode,referencePointsOn,ctx);
  
  }