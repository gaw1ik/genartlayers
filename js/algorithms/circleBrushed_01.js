function circleBrushedDict() {

    circleBrushed = {
        
        // // Circle Pack
        sectionA:{type:"header_only",title:"circleBrushed Properties"},

            section1:{type:"section_header",columns:2,title:"Location/Scale/Orientation"},

                seed:{value:0, min:0, max:1000, step:1, type:"number", class:"number", calc:1},

                xOffset:{value:0, min:-1, max:1, step:0.001, type:"range", class:"slider", calc:0}, 
                yOffset:{value:0, min:-1, max:1, step:0.001, type:"range", class:"slider", calc:0}, 

                nStrokes:{value:100, min:0, max:1000, step:1, type:"range", class:"slider", calc:1}, 

                radMin:{value:0.1, min:0, max:0.5, step:0.001, type:"range", class:"slider", calc:1}, 
                radMax:{value:0.3, min:0, max:0.5, step:0.001, type:"range", class:"slider", calc:1}, 
        

        sectionC:{type:"header_only",title:"Line Properties"},
            sectionC1:{type:"section_header",columns:2,title:"Line Properties"},
                lineWidthCenter:{value:0.005, min:0.0001, max:0.01, step:0.0001, type:"range", class:"slider", calc:0},  
                lineWidthVar:{value:0, min:0, max:100, step:1, type:"range", class:"slider", calc:0}, 


        // Colors
        sectionB:{type:"header_only",title:"Colors"},

            // color 1
            section2:{type:"section_header",columns:2,title:"Color 1"},
                colorVariation:{value:0, min:0, max:100, step:1, type:"range", class:"slider", calc:0}, 
                hueCenter1:{value:90, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
                satCenter1:{value:30, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
                litCenter1:{value:80, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0},     
                alpha1:{value:255, min:0, max:255, step:1, type:"range", class:"slider-lit", calc:0}, 

        
      }

    return circleBrushed;

  }




  function calc_circleBrushed( circleBrushed ) {

    return circleBrushed;

  }




  function draw_circleBrushed( circleBrushed, ctx ) {

    // bring in parameters
    var nStrokes = parseFloat( circleBrushed.nStrokes.value, 10 );

    var radMin = parseFloat( circleBrushed.radMin.value, 10 );
    var radMax = parseFloat( circleBrushed.radMax.value, 10 );

    var xOffset = parseFloat( circleBrushed.xOffset.value, 10 );
    var yOffset = parseFloat( circleBrushed.yOffset.value, 10 );
    // color 1
    var hueCenter1 = parseFloat( circleBrushed.hueCenter1.value, 10 );
    var satCenter1 = parseFloat( circleBrushed.satCenter1.value, 10 );
    var litCenter1 = parseFloat( circleBrushed.litCenter1.value, 10 );
    var alpha1 = parseFloat( circleBrushed.alpha1.value, 10 );
    var colorVariation = parseFloat( circleBrushed.colorVariation.value, 10 );
    // line props
    var lineWidthCenter = parseFloat( circleBrushed.lineWidthCenter.value, 10 );
    var lineWidthVar = parseFloat( circleBrushed.lineWidthVar.value, 10 );

    // var segLengthCenter = parseFloat( circleBrushed.segLengthCenter.value, 10 );

    

    // base circle
    rad = (radMax + radMin)/2 * h;
    hue = hueCenter1;
    sat = satCenter1;
    lit = litCenter1;
    alpha = alpha1;       

    var x = 0.5*w + xOffset*w;
    var y = 0.5*h + yOffset*h;

    var startAngle = 0;
    var endAngle = twoPI;

    ctx.beginPath();
    ctx.ellipse( x,y, rad,rad,0, startAngle,endAngle )
    ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha/255 + ')'; 
    ctx.lineWidth = (radMax - radMin) * h;
    ctx.stroke()




    // stroke marks
    for(let i=0; i<nStrokes; i++){

        rad = getRandomFloat(radMin,radMax) * h;

        // vary sat and lit only
        hue = hueCenter1;
        sat = vary(satCenter1,colorVariation);
        lit = vary(litCenter1,colorVariation);
        alpha = alpha1;
        

        // lineWidthCenter = segLengthCenter * lineWidth;

        lineWidth2 = vary(lineWidthCenter,lineWidthVar);
        

        var x = 0.5*w + xOffset*w;
        var y = 0.5*h + yOffset*h;

        var startAngle = getRandomFloat(0,twoPI);
        var endAngle = getRandomFloat(0,twoPI);

        ctx.beginPath();
        ctx.ellipse( x,y, rad,rad,0, startAngle,endAngle )
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha/255 + ')'; 
        ctx.lineWidth = lineWidth2*h;
        ctx.stroke()

    }
    

    



        

  }