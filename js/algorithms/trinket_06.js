function trinketDict() {

    trinket = {
        
        // // Circle Pack
        sectionA:{type:"header_only",title:"trinket Properties"},

        section1:{type:"section_header",columns:2,title:"Location/Scale/Orientation"},

        seed:{value:0, min:0, max:1000, step:1, type:"number", class:"number", calc:1},

        nJumps:{value:100, min:1, max:10000, step:50, type:"range", class:"slider", calc:1},   

        // nStepsPopCenter:{value:10, min:1, max:100, step:1, type:"range", class:"slider", calc:1}, 
        
        // angleCenter:{value:0, min:0, max:twoPI, step:PIo64, type:"range", class:"slider", calc:1}, 
        angleDeltaMin:{value:0, min:0, max:180, step:1, type:"range", class:"slider", calc:1},
        // angleDeltaRange:{value:90, min:0, max:180, step:1, type:"range", class:"slider", calc:1},
        segLengthCenter:{value:0.1, min:0.001, max:1.0000, step:0.001, type:"range", class:"slider", calc:1},

        angleDeltaVariation:{value:10, min:0, max:100, step:1, type:"range", class:"slider", calc:1},
        segLengthVariation:{value:10, min:0, max:100, step:0.1, type:"range", class:"slider", calc:1},

        xOffset:{value:0, min:-1, max:1, step:0.001, type:"range", class:"slider", calc:0}, 
        yOffset:{value:0, min:-1, max:1, step:0.001, type:"range", class:"slider", calc:0}, 
        

        sectionC:{type:"header_only",title:"Line Properties"},
        sectionC1:{type:"section_header",columns:2,title:"blobs"},
        lineWidth:{value:0.005, min:0.0001, max:0.001, step:0.0001, type:"range", class:"slider", calc:0},   

        lineWidthVar:{value:0, min:0, max:100, step:1, type:"range", class:"slider", calc:0}, 


        // Colors
        sectionB:{type:"header_only",title:"Colors"},

        // Fill Mode
        section2a:{type:"section_header",columns:2,title:"Fill Mode"},
        fillMode:{value:0, min:0, max:1, step:1, type:"range", class:"on-off", calc:0},

        // color 1
        section2:{type:"section_header",columns:2,title:"Color 1"},
        colorVariation:{value:0, min:0, max:100, step:1, type:"range", class:"slider", calc:0}, 
        hueCenter1:{value:90, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
        satCenter1:{value:30, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
        litCenter1:{value:80, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0},     
        
        sectionB3:{type:"section_header",columns:2,title:"Backing Color"},
        hueBacking:{value:00, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
        satBacking:{value:00, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
        litBacking:{value:00, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0}, 
        alphaBacking:{value:255, min:0, max:255, step:1, type:"range", class:"slider-lit", calc:0}, 

        
      }

    return trinket;

  }




  function calc_trinket( trinket ) {

    // assignFromControls(trinket);  // get the control values and assign them to the object variables
    // var seed            = parseFloat( trinket.seed.value, 10 );
    // var angleCenter      = parseFloat( trinket.angleCenter.value, 10 );
    var angleDeltaMin      = parseFloat( trinket.angleDeltaMin.value, 10 );
    // var angleDeltaRange      = parseFloat( trinket.angleDeltaRange.value, 10 );
    var segLengthCenter = parseFloat( trinket.segLengthCenter.value, 10 );
    var nJumps      = parseFloat( trinket.nJumps.value, 10 );
    // var nStepsPopCenter      = parseFloat( trinket.nStepsPopCenter.value, 10 );
    var angleDeltaVariation      = parseFloat( trinket.angleDeltaVariation.value, 10 );
    var segLengthVariation      = parseFloat( trinket.segLengthVariation.value, 10 );

    

    // variables
    
    let lines = [];


    var xCenterOffset = 0;
    var yCenterOffset = 0;

    // conversions
    angleDeltaMinR = angleDeltaMin * deg2rad;
    // angleDeltaRangeR = angleDeltaRange * deg2rad;

    // path.push([0, 0]);

    var polarity = 1;

    var currentAngleR = 0;

    trinket.lines = [];


    segLength = vary(segLengthCenter, segLengthVariation);
    var thetaR = vary(angleDeltaMinR, angleDeltaVariation);
    x1 = segLength*Math.cos(thetaR);
    y1 = segLength*Math.sin(thetaR);

    
    for (let j=0; j<nJumps; j++) {

        let path = []; // make a new path variable each time


        // for (let i=0; i<nStepsPopCenter; i++) {



        angleDeltaR = vary(angleDeltaMinR, angleDeltaVariation);

        currentAngleR = currentAngleR + angleDeltaR;

        // angle
        var thetaR = currentAngleR*polarity;

        segLength = vary(segLengthCenter, segLengthVariation);

        // next point (a point on the circle)
        x2 = segLength*Math.cos(thetaR);
        y2 = segLength*Math.sin(thetaR);
        
        // push the next point into the into path
        path.push( [x1,y1], [x2,y2] );

                // current point
                var x1 = x2;
                var y1 = y2;

        // switch angular direction when it "pops"

        polarity=polarity*-1 

        // }

        trinket.lines.push(path);

    }

    // trinket.linespath = path;

    return trinket;

  }




  function draw_trinket( trinket, ctx ) {

    // bring in parameters    
    var xOffset = parseFloat( trinket.xOffset.value, 10 );
    var yOffset = parseFloat( trinket.yOffset.value, 10 );
    // color 1
    var hueCenter1 = parseFloat( trinket.hueCenter1.value, 10 );
    var satCenter1 = parseFloat( trinket.satCenter1.value, 10 );
    var litCenter1 = parseFloat( trinket.litCenter1.value, 10 );
    // // backing color
    var hueBacking = parseFloat( trinket.hueBacking.value, 10 );
    var satBacking = parseFloat( trinket.satBacking.value, 10 );
    var litBacking = parseFloat( trinket.litBacking.value, 10 );
    var alphaBacking = parseFloat( trinket.alphaBacking.value, 10 );

    var fillMode = parseFloat( trinket.fillMode.value, 10 );
    var lineWidth = parseFloat( trinket.lineWidth.value, 10 );

    var colorVariation = parseFloat( trinket.colorVariation.value, 10 );

    var lineWidthVar = parseFloat( trinket.lineWidthVar.value, 10 );

    var segLengthCenter = parseFloat( trinket.segLengthCenter.value, 10 );

    

    



    // variables



    let lines = trinket.lines;


    // draw the backing circle first
    let circle = {loc:[0.5,0.5], rad:segLengthCenter};
    var hue = hueBacking;
    var sat = satBacking;
    var lit = litBacking;
    var alpha = alphaBacking;
    drawCircle(circle,xOffset,yOffset,0,hue,sat,lit,alpha,"fill",ctx);






    // fill mode
    if(fillMode==0){fillMode = "fill";}else{}

    //   console.log("circle",circle)

    var xOffset = xOffset + 0.5;
    var yOffset = yOffset + 0.5;

    var close = 0; // don't close the path

    for(let i=0; i<lines.length; i++){

        let path = lines[i];

        // vary sat and lit only
        hue = hueCenter1;
        sat = vary(satCenter1,colorVariation);
        lit = vary(litCenter1,colorVariation);

        // // vary hue and sat only
        // var hue = vary(hueCenter1,colorVariation);
        // var sat = vary(satCenter1,colorVariation);
        // var lit = litCenter1;

        lineWidthCenter = segLengthCenter * lineWidth;

        lineWidth2 = vary(lineWidthCenter,lineWidthVar);
        

        drawPath( path, xOffset,yOffset, lineWidth2, hue,sat,lit, fillMode, close, ctx );

    }
    

    



        

  }