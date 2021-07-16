function signatureDict() {

    signature = {
        // tabName:"TabE",
        seed:{value:1, min:1, max:100, step:1, type:"number", functionToExecute:"draw"},

        
        x0:{value:0.02, min:0, max:1, step:0.001, type:"range", class:"slider", functionToExecute:"draw"},
        y0:{value:0.97, min:0, max:1, step:0.001, type:"range", class:"slider", functionToExecute:"draw"},

        fontSize0:{value:0.003, min:0.001, max:1, step:0.001, type:"range", class:"slider", functionToExecute:"draw"},


        hueCenter:{value:90, min:0, max:359, step:1, type:"range", class:"slider-hue", functionToExecute:"draw"},
        satCenter:{value:30, min:0, max:100, step:1, type:"range", class:"slider-sat", functionToExecute:"draw"},
        litCenter:{value:80, min:0, max:100, step:1, type:"range", class:"slider-lit", functionToExecute:"draw"},

        variation:{value:50, min:0, max:100, step:1, type:"range", class:"slider", functionToExecute:"draw"},

        
        // tabIndex: 0,
      }

    return signature;

}




function calc_signature( signature ) {
  //dummy function
  return signature
}




function draw_signature( signature, ctx ) {

  var hueCenter = signature.hueCenter.value;
  var satCenter = signature.satCenter.value;
  var litCenter = signature.litCenter.value;

  var x0 = signature.x0.value*w;
  var y0 = signature.y0.value*h;

  var fontSize0 = signature.fontSize0.value*h;

  var variation = signature.variation.value;

  var seed = signature.seed.value;

  var colorToSizeVarRatio = 3;



  myrng = new seedrandom( Math.random() );


  // variables
  let chars = [];
  let fontSize;
  let wordWidth;
  let charHeightMax;



  var font = "Arial";

  var str = "Brian Gawlik";

  let char;

  x = x0; // first character is placed at x0

  charHeightMax = 0;

  // myrng = new Math.seedrandom(seed);

  for(let i=0; i<str.length; i++){    

      char = str[i];

      fontSize = vary(fontSize0,variation);
      
      ctx.font = fontSize +"px " + font;

      var hue = hueCenter;
    //   var hue = vary(hueCenter,variation);
      var sat = vary(satCenter,variation/colorToSizeVarRatio);
      var lit = vary(litCenter,variation/colorToSizeVarRatio);

      ctx.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)';  

      let charWidth = ctx.measureText(char).width;

      // let charHeight = ctx.measureText(char).height;

      ctx.fillText(char,x,y0);
      x = x + charWidth;
      // //console.log(char,x,font);

      // //console.log("charHeight",charHeight)

  }


  // //console.log("charHeightMax",charHeightMax)














  ////////////////////////////////////////////////////////////////////////////// piece title
  str = fpath.value;

  // //console.log("str",str)

  x = x0; // first character is placed at x0

  let character;
  
  chars=[];


  // calculate chars for piece title
  for(let i=0; i<str.length; i++) {    

      value = str[i];

      fontSize = vary(fontSize0,variation);

      character = {value:value, fontSize:fontSize};

      // //console.log("character",character);

      chars.push(character);

      // //console.log("chars",chars)

      // wordWidth = x + charWidth;
      
  }
  
  // //console.log("chars",chars)

  // draw chars for piece title

  y = y0 - fontSize0 - fontSize0*(variation/100);

  for(let i=0; i<str.length; i++){    

    character = chars[i];    

    value = character.value;
    fontSize = character.fontSize;
    
    ctx.font = fontSize + "px " + font;

    // //console.log("value",value)
    // //console.log("fontSize",fontSize)

    var hue = hueCenter;
    var sat = vary(satCenter,variation/colorToSizeVarRatio);
    var lit = vary(litCenter,variation/colorToSizeVarRatio);

    ctx.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)';  

    ctx.fillText(value,x,y);

    charWidth = ctx.measureText(value).width;

    x = x + charWidth;

  }

}








  