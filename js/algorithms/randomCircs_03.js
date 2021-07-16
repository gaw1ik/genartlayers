function randomCircsDict() {

    randomCircs = {
        
        // sectionA:{type:"header_only",title:"Properties"},

        section1:{type:"section_header",columns:2,title:"Location/Scale/Orientation"},
        seed:{value:0, min:0, max:1000, step:1, type:"number", class:"number", calc:1},
        nCircles:{value:100, min:0, max:1000, step:1, type:"range", class:"slider", calc:1},
        radCenter:{value:0.1, min:0.0001, max:0.1, step:0.0001, type:"range", class:"slider", calc:1},
        variation:{value:0, min:0, max:100, step:1, type:"range", class:"slider", calc:1},

        section2:{type:"section_header",columns:2,title:"Color"},
        hueCenter1:{value:0, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
        satCenter1:{value:10, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
        litCenter1:{value:50, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0},
        
      }

    return randomCircs;

  }




  function calc_randomCircs( randomCircs ) {

    // bring in parameters
    var nCircles = parseFloat( randomCircs.nCircles.value, 10 );
    var radCenter = parseFloat( randomCircs.radCenter.value, 10 );
    var variation = parseFloat( randomCircs.variation.value, 10 );
    var lineWidth = 0.005;

    // variables
    var x;
    var y;
    var r;
    let circles = [];
    let circle= {};
    

    // calculate coordiantes


    for(let i=0; i<nCircles; i++){

      x = myrng();
      y = myrng();
      r = vary(radCenter,variation);

    //   //console.log("radCenter",radCenter)
    //   //console.log("variation",variation)

      circle = {loc:[x,y], rad:r};

      

      circles.push( circle  );

    }

    randomCircs.circles = circles;



    return randomCircs;
  }




  function draw_randomCircs( randomCircs, ctx ) {

    // bring in parameters
    var hueCenter1 = parseFloat( randomCircs.hueCenter1.value, 10 );
    var satCenter1 = parseFloat( randomCircs.satCenter1.value, 10 );
    var litCenter1 = parseFloat( randomCircs.litCenter1.value, 10 );
    var nCircles = parseFloat( randomCircs.nCircles.value, 10 );
    var variation = parseFloat( randomCircs.variation.value, 10 );
    var lineWidth = 0.005;

    // variables
    var xOffset;
    var yOffset;
    var hue;
    var sat;
    var lit;
    let circle;

    for(let i=0; i<nCircles; i++){

      circle = randomCircs.circles[i];

      // offsets
      xOffset = 0;
      yOffset = 0;

      // colors
        hue = hueCenter1;
        sat = vary(satCenter1,variation);
        lit = vary(litCenter1,variation);
      alpha = 255;

      // fill mode
      fillMode = "fill";

      drawCircle(circle, xOffset, yOffset, lineWidth, hue, sat, lit, alpha, fillMode, ctx);


      

    }

  }