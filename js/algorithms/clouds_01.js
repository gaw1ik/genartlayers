function cloudsDict() {

    clouds = {

        sectionA:{type:"header_only",title:"clouds Properties"},

        section1:{type:"section_header",columns:2,title:"Geometry"},
        seed:{value:0, min:0, max:1000, step:1, type:"number", class:"number", calc:1},
        nCircs:{value:100, min:1, max:1000, step:1, type:"range", class:"slider", calc:1},
        rad0:{value:0.3, min:0, max:1, step:0.01, type:"range", class:"slider", calc:1},
        radVariation:{value:60, min:0, max:100, step:1, type:"range", class:"slider", calc:1},

        yMin:{value:0.0, min:0, max:1, step:0.01, type:"range", class:"slider", calc:1},
        yMax:{value:1.0, min:0, max:1, step:0.01, type:"range", class:"slider", calc:1},

        section2:{type:"section_header",columns:2,title:"Color"},
        hueCenter1:{value:211, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
        satCenter1:{value:37, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
        litCenter1:{value:100, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0},
        colorVariation:{value:10, min:0, max:100, step:1, type:"range", class:"slider", calc:0},

        alphaMax:{value:0.01, min:0.0, max:0.3, step:0.001, type:"range", class:"slider", calc:0},

      }

    return clouds;

  }









  function calc_clouds( clouds ) {
    //dummy function
    return clouds
  }







  
  function draw_clouds( clouds, ctx ) {
  
    // parameters
    var hueCenter1 = parseFloat(clouds.hueCenter1.value,10);
    var satCenter1 = parseFloat(clouds.satCenter1.value,10);
    var litCenter1 = parseFloat(clouds.litCenter1.value,10);
    var colorVariation = parseFloat(clouds.colorVariation.value,10);
    var radVariation = parseFloat(clouds.radVariation.value,10);
    var rad0 = parseFloat(clouds.rad0.value,10);
    var nCircs = parseFloat(clouds.nCircs.value,10);
    var alphaMax = parseFloat(clouds.alphaMax.value,10);
    var yMin = parseFloat(clouds.yMin.value,10);
    var yMax = parseFloat(clouds.yMax.value,10);


    // variables
    var hue;
    var lit;
    var sat;
    var radX;
    var radY;
    var x;
    var y;
     



    for (let i=0; i<nCircs; i++){

        hue = hueCenter1;
        sat = vary(satCenter1,colorVariation);
        lit = vary(litCenter1,colorVariation);
        // alpha = 0;

        radX = vary(rad0*h,radVariation);
        radY = radX;

        x = myrng()*w;
        y = getRandomFloat(yMin,yMax)*h;

        var grd = ctx.createRadialGradient(x,y,0, x,y,radX);   // radial gradient
        grd.addColorStop( 0, 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,' + alphaMax + ')' );
        grd.addColorStop( 1, 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,' + 0.0 + ')' );

        ctx.beginPath();
        ctx.ellipse(x,y, radX,radY, 0,0,twoPI);  
        // ctx.fillStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)';      
        ctx.fillStyle = grd;  
        ctx.fill();
    }

    // image = canvases[0];

    // ctx.drawImage(image, xOffset, yOffset, width, height);
  
  }
  
  
  
  
  
  
  
  
    