  function drawCircleBrushed( radMin, radMax, xCenter, yCenter, nStrokes, lineWidthCenter, lineWidthVar, hueCenter1,satCenter1,litCenter1,alpha1, colorVar, ctx) {


    // base circle
    rad = (radMax + radMin)/2 * h;
    hue = hueCenter1;
    sat = satCenter1;
    lit = litCenter1;
    alpha = alpha1;       

    var x = xCenter * w;
    var y = yCenter * h;

    var startAngle = 0;
    var endAngle = twoPI;

    // ctx.beginPath();
    // ctx.ellipse( x,y, rad,rad,0, startAngle,endAngle )
    // ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha/255 + ')'; 
    // ctx.lineWidth = (radMax - radMin) * h;
    // ctx.stroke()




    // stroke marks
    for(let i=0; i<nStrokes; i++){

        rad = getRandomFloat(radMin,radMax) * h;

        // vary sat and lit only
        hue = hueCenter1;
        sat = vary(satCenter1,colorVar);
        lit = vary(litCenter1,colorVar);
        alpha = alpha1/255;
        

        lineWidth2 = vary(lineWidthCenter,lineWidthVar);
        

        var x = xCenter * w;
        var y = yCenter * h;

        var startAngle = getRandomFloat(0,twoPI);
        var endAngle = getRandomFloat(0,twoPI);

        ctx.beginPath();
        ctx.ellipse( x,y, rad,rad,0, startAngle,endAngle )
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.lineWidth = lineWidth2*h;
        ctx.stroke()

    }
    

    



        

  }