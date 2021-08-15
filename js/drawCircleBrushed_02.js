  function drawCircleBrushed( radMin, radMax, xCenter, yCenter, nStrokes, lineWidthCenter, lineWidthVar, hueCenter1,satCenter1,litCenter1,alpha1, colorVar, rng02, ctx) {


    // base circle
    rad = (radMax + radMin)/2 * artboardH;
    hue = hueCenter1;
    sat = satCenter1;
    lit = litCenter1;
    alpha = alpha1;       

    var x = xCenter * artboardW;
    var y = yCenter * artboardH;

    var startAngle = 0;
    var endAngle = twoPI;

    // ctx.beginPath();
    // ctx.ellipse( x,y, rad,rad,0, startAngle,endAngle )
    // ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha/255 + ')'; 
    // ctx.lineWidth = (radMax - radMin) * artboardH;
    // ctx.stroke()





    // stroke marks
    for(let i=0; i<nStrokes; i++){

        rad = getRandomFloat(radMin,radMax, rng = rng02) * artboardH;

        // vary sat and lit only
        hue = hueCenter1;
        sat = vary(satCenter1,colorVar,rng = rng02);
        lit = vary(litCenter1,colorVar,rng = rng02);
        alpha = alpha1/255;
        

        lineWidth2 = vary(lineWidthCenter,lineWidthVar,rng=rng02);
        

        var x = xCenter * artboardW;
        var y = yCenter * artboardH;

        var startAngle = getRandomFloat(0,twoPI,rng = rng02);
        var endAngle = getRandomFloat(0,twoPI,rng = rng02);

        ctx.beginPath();
        ctx.ellipse( x,y, rad,rad,0, startAngle,endAngle )
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.lineWidth = lineWidth2 * artboardH;
        ctx.stroke()

    }
    

    



        

  }