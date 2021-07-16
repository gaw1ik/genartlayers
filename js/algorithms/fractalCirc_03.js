
function fractalCircDict() {

    fractalCirc = {

        // 1x3
        section1:{type:"section_header",columns:2,title:"Location/Scale/Orientation"},
        x0:{value:0.5, min:0, max:1, step:0.01, type:"range", class:"slider", functionToExecute:"draw"},
        y0:{value:0.5, min:0, max:1, step:0.01, type:"range", class:"slider", functionToExecute:"draw"},
        scale:{value:1, min:0.1, max:8, step:0.1, type:"range", class:"slider", functionToExecute:"draw"},
        thetad0:{value:0, min:0, max:360, step:1, type:"range", class:"slider", functionToExecute:"draw"},


        // 3x1
        section2:{type:"section_header",columns:3,title:"fractalCirc Properties"},
        nLevels:{value:3, min:1, max:9, step:1, type:"number", functionToExecute:"draw"},
        levelCutoff:{value:0, min:0, max:8, step:1, type:"number", functionToExecute:"draw"},
        nPoints:{value:3, min:1, max:12, step:1, type:"number", functionToExecute:"draw"},

        // 1x3
        section3:{type:"section_header",columns:3,title:"Radial Properties"},
        r0:{value:0.3, min:0.01, max:1, step:0.01, type:"range", class:"slider", functionToExecute:"draw"},
        r0Point:{value:0.3, min:0.01, max:1, step:0.01, type:"range", class:"slider", functionToExecute:"draw"},
        radRatio:{value:2, min:0.1, max:8, step:0.1, type:"range", class:"slider", functionToExecute:"draw"},

        // 1x1
        section4:{type:"section_header",columns:2,title:"Line Properties"},
        lineWidth:{value:0.001, min:0.0001, max:0.1, step:0.0001, type:"range", class:"slider", functionToExecute:"draw"},
        lineWidthRatio:{value:16, min:1, max:64, step:1, type:"range", class:"slider", functionToExecute:"draw"},
        variation:{value:10, min:0, max:100, step:1, type:"range", class:"slider", functionToExecute:"draw"},

        // 1x3
        section5:{type:"section_header",columns:3,title:"Color"},
        hue:{value:90, min:0, max:359, step:1, type:"range", class:"slider-hue", functionToExecute:"draw"},
        sat:{value:30, min:0, max:100, step:1, type:"range", class:"slider-sat", functionToExecute:"draw"},
        lit:{value:80, min:0, max:100, step:1, type:"range", class:"slider-lit", functionToExecute:"draw"},

        // 2x1
        section6:{type:"section_header",columns:3,title:"Defectivity/Error"},
        growthDefectivity:{value:0, min:0, max:100, step:1, type:"range", class:"slider", functionToExecute:"draw"},
        spotDefectivity:{value:0, min:0, max:100, step:1, type:"range", class:"slider", functionToExecute:"draw"},
        seed:{value:1, min:1, max:100, step:1, type:"number", functionToExecute:"draw"},
        warble:{value:0, min:0, max:1, step:0.001, type:"range", class:"slider", functionToExecute:"draw"},
        thetaError:{value:0, min:0, max:360, step:1, type:"range", class:"slider", functionToExecute:"draw"},
        radiusError:{value:0, min:0, max:100, step:1, type:"range", class:"slider", functionToExecute:"draw"},


        section7:{type:"section_header",columns:3,title:"Stroke Properties"},
        radInOutRatio:{value:0.30, min:0, max:0.90, step:0.01, type:"range", class:"slider", calc:0},
        colorVar:{value:10, min:0, max:100, step:1, type:"range", class:"slider", calc:0},
        lineWidthCenter:{value:0.001, min:0.0001, max:0.01, step:0.0001, type:"range", class:"slider", calc:0},
        nStrokes:{value:100, min:10, max:1000, step:1, type:"range", class:"slider", calc:0},
        
        
        // // GUI ARRANGEMENT VARIABLE
        // guiArrangement :  [
        //   [3,3],
        //   [3,1],
        //   [1,3],
        //   [1,1],
        //   [1,3],
        //   [2,1],
        // ]


      }

    return fractalCirc;

  }










function calc_fractalCirc( fractalCirc ) {
  //dummy function
  return fractalCirc
}












function draw_fractalCirc( fractalCirc, ctx ) {

  var hue0 = parseInt( fractalCirc.hue.value, 10 );
  var sat0 = fractalCirc.sat.value;
  var lit0 = fractalCirc.lit.value;

  var lineWidth0 = fractalCirc.lineWidth.value * h;
  var lineWidthRatio = fractalCirc.lineWidthRatio.value;
  var alpha0 = 1;
  var thetar0 = fractalCirc.thetad0.value * Math.PI/180;

  let shapes = [];
  let locs = [];

  // properties
  var nLevels = fractalCirc.nLevels.value;
  var nPoints = fractalCirc.nPoints.value;
  var radRatio = fractalCirc.radRatio.value;

  var x0 = fractalCirc.x0.value * w;
  var y0 = fractalCirc.y0.value * h;

  var r0 = fractalCirc.r0.value * h;
  var r0Point = fractalCirc.r0Point.value * h;
  var scale = fractalCirc.scale.value;

  var seed = fractalCirc.seed.value;

  var levelCutoff = fractalCirc.levelCutoff.value;

  var variation = fractalCirc.variation.value;

  var growthDefectivity = fractalCirc.growthDefectivity.value;
  var spotDefectivity   = fractalCirc.spotDefectivity.value;

  var warble = fractalCirc.warble.value;

  var thetaError = fractalCirc.thetaError.value * Math.PI/180; 

  var radiusError = fractalCirc.radiusError.value;

  // stroke props
  var radInOutRatio = fractalCirc.radInOutRatio.value;
  var colorVar = fractalCirc.colorVar.value;
  var lineWidthCenter = fractalCirc.lineWidthCenter.value;
  var nStrokes = fractalCirc.nStrokes.value;

  
  


  // variables
  var x;
  var y;  
  var radius;
  var radiusPoint;
  var radiusX;
  var radiusY;
  var hue;
  var sat;
  var lit;

  

  var cy;
  var cy;

  

  // myrng = new Math.seedrandom(seed);

  shapes = [];

  // initialize shapes array
  for(let l=0; l<nLevels; l++) {

    shapes.push([]);
    
  }

  

  shapes[0].push( {x1:x0,y1:y0} ); 

  for(let l=0; l<nLevels-1; l++) {

    // locs = shapes[l];

    radius = r0/(radRatio**l);

    for(let i=0; i<shapes[l].length; i++) {

      // the location of the circle center for this level and this location
      cx = shapes[l][i].x1;
      cy = shapes[l][i].y1;      

      for (let j=0; j<nPoints; j++) {   
        
        if(makeChoice(100-growthDefectivity)==1) {
        
          thetar = thetar0 - Math.PI/2 + getRandomFloat(-thetaError,thetaError);

          x1 = cx + scale*radius * Math.cos(j * 2*Math.PI / nPoints + thetar);
          y1 = cy + scale*radius * Math.sin(j * 2*Math.PI / nPoints + thetar);

          // shapes[l+1][i*nPoints + j].x1 = x1;    
          // shapes[l+1][i*nPoints + j].y1 = y1; 

          shapes[l+1].push( {x1:x1,y1:y1} ); 

        }

      }

     

    }

    

  }








  // DRAW
  for(let l=0; l<nLevels; l++) {

    // shapes = shapes[l];

    if( l>=levelCutoff ) {

      radiusPoint1 = r0Point/(radRatio**l) * scale;

      

      for(let i=0; i<shapes[l].length; i++) {
        // draw circle

        if(makeChoice(100-spotDefectivity)==1) {

          radiusPoint = vary(radiusPoint1,radiusError)
        
          radiusX = radiusPoint;
          radiusY = radiusPoint;
          x1 = shapes[l][i].x1;
          y1 = shapes[l][i].y1;

          var maxAmount = radiusPoint * warble;
          x1 = plusOrMinusRange(x1, maxAmount);
          y1 = plusOrMinusRange(y1, maxAmount);

        //   ctx.beginPath();

          var thetaStart = getRandomFloat(0,2*Math.PI);
          var thetaEnd   = getRandomFloat(0,2*Math.PI);

          var thetaStart = 0;
          var thetaEnd   = 2*Math.PI;

        //   ctx.ellipse(x1, y1, radiusX, radiusY, 0, thetaStart, thetaEnd);

          if(myrng()<0.08){
            hue = hue0 + 180;
            sat = vary(sat0 - 40,variation);
          } else {
            hue = hue0;
            var sat = vary(sat0,variation);
          }


          
          var lit = vary(lit0,variation);


          lineWidth = radiusPoint/lineWidthRatio * scale;


        var radMax = radiusX/h; 
        var radMin = radMax - radInOutRatio*radMax;
        var xCenter = x1/w;
        var yCenter = y1/h;
        // var nStrokes = 100;
        // var lineWidthCenter = 0.001;
        var lineWidthVar = 100;
        var hueCenter1 = hue;
        var satCenter1 = sat;
        var litCenter1 = lit;
        var alpha1 = 255;

        // //console.log("x,y,radMax,radMin",xCenter,yCenter,radMax,radMin);

        // make a new random number generator for the stroking
        var seed = 1;
        let rng02 = new seedrandom(seed);


        drawCircleBrushed( radMin, radMax, xCenter, yCenter, nStrokes, lineWidthCenter, lineWidthVar, hueCenter1,satCenter1,litCenter1,alpha1, colorVar, rng02, ctx)

        }

      }

    }

  }

}








  