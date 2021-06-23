function starsDict() {

    stars = {
        
        sectionA:{type:"header_only",title:"stars Properties"},

        section1:{type:"section_header",columns:2,title:"Location/Scale/Orientation"},
        seed:{value:0, min:0, max:1000, step:1, type:"number", class:"number", calc:1},
        nCircles:{value:100, min:0, max:1000, step:1, type:"range", class:"slider", calc:1},
        radCenter:{value:0.001, min:0.0001, max:0.01, step:0.0001, type:"range", class:"slider", calc:1},
        radVariation:{value:50, min:0, max:100, step:1, type:"range", class:"slider", calc:1},

        section1:{type:"section_header",columns:2,title:"Color"},
        hueCenter1:{value:90, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
        satCenter1:{value:30, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
        litCenter1:{value:80, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0},
        alpha1:{value:0, min:0, max:255, step:1, type:"range", class:"slider-lit", calc:0},
        colorVariation:{value:10, min:0, max:100, step:1, type:"range", class:"slider", calc:0},
        
      }

    return stars;

  }




  function calc_stars( stars ) {

    // bring in parameters
    var nCircles = parseFloat( stars.nCircles.value, 10 );
    var radCenter = parseFloat( stars.radCenter.value, 10 );
    var radVariation = parseFloat( stars.radVariation.value, 10 );
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
      r = vary(radCenter,radVariation);

    //   console.log("radCenter",radCenter)
    //   console.log("variation",variation)

      circle = {loc:[x,y], rad:r};

      

      circles.push( circle  );

    }

    stars.circles = circles;



    return stars;
  }




  function draw_stars( stars, ctx ) {

    // bring in parameters
    var hueCenter1 = parseFloat( stars.hueCenter1.value, 10 );
    var satCenter1 = parseFloat( stars.satCenter1.value, 10 );
    var litCenter1 = parseFloat( stars.litCenter1.value, 10 );
    var alpha1 = parseFloat( stars.alpha1.value, 10 );
    var nCircles = parseFloat( stars.nCircles.value, 10 );
    var colorVariation = parseFloat( stars.colorVariation.value, 10 );
    var lineWidth = 0.005;

    // variables
    var xOffset;
    var yOffset;
    var hue;
    var sat;
    var lit;
    let circle;

    for(let i=0; i<nCircles; i++){

      circle = stars.circles[i];

      // offsets
      xOffset = 0;
      yOffset = 0;

      // colors
      hue = hueCenter1;
      sat = vary(satCenter1,colorVariation);
      lit = vary(litCenter1,colorVariation);

      // fill mode
      fillMode = "fill";

      drawCircle(circle, xOffset, yOffset, lineWidth, hue, sat, lit, alpha1, fillMode, ctx);

      

    }

  }