function bgCircsDict() {

    bgCircs = {

        sectionA:{type:"header_only",title:"bgCircs Properties"},

        section1:{type:"section_header",columns:2,title:"Geometry"},
        seed:{value:0, min:0, max:1000, step:1, type:"number", class:"number", calc:1},
        nCircs:{value:11, min:1, max:100, step:1, type:"range", class:"slider", calc:1},
        rad0:{value:0.7, min:0, max:1, step:0.1, type:"range", class:"slider", calc:1},
        radVariation:{value:43, min:0, max:100, step:1, type:"range", class:"slider", calc:1},

        section2:{type:"section_header",columns:2,title:"Color"},
        hueCenter1:{value:211, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
        satCenter1:{value:37, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
        litCenter1:{value:20, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0},
        colorVariation:{value:10, min:0, max:100, step:1, type:"range", class:"slider", calc:0},

      }

    return bgCircs;

  }









  function calc_bgCircs( bgCircs ) {
    //dummy function
    return bgCircs
  }







  
  function draw_bgCircs( bgCircs, ctx ) {
  
    // parameters
    var hueCenter1 = parseFloat(bgCircs.hueCenter1.value,10);
    var satCenter1 = parseFloat(bgCircs.satCenter1.value,10);
    var litCenter1 = parseFloat(bgCircs.litCenter1.value,10);
    var colorVariation = parseFloat(bgCircs.colorVariation.value,10);
    var radVariation = parseFloat(bgCircs.radVariation.value,10);
    var rad0 = parseFloat(bgCircs.rad0.value,10);
    var nCircs = parseFloat(bgCircs.nCircs.value,10);
    // var seed = parseFloat(bgCircs.seed.value,10);


    // variables
    var hue;
    var lit;
    var sat;
    var radX;
    var radY;
    var x;
    var y;
    
    ctx.beginPath();
    ctx.rect(0,0,w,h)
    ctx.fillStyle = 'hsl(' + hueCenter1 + ', ' +  satCenter1 + '%, ' + litCenter1 + '%)'; 
    ctx.fill();     



    for (let i=0; i<nCircs; i++){

        hue = hueCenter1;
        sat = vary(satCenter1,colorVariation);
        lit = vary(litCenter1,colorVariation);
        // alpha = 0;

        radX = vary(rad0*h,radVariation);
        radY = radX;

        x = myrng()*w;
        y = myrng()*h;

        var grd = ctx.createRadialGradient(x,y,0, x,y,radX);   // radial gradient
        grd.addColorStop( 0, 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,' + 1.0 + ')' );
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
  
  
  
  
  
  
  
  
    