function bgDict() {

    bg = {

        hue:{value:90, min:0, max:359, step:1, type:"range", class:"slider-hue", calc:0},
        sat:{value:30, min:0, max:100, step:1, type:"range", class:"slider-sat", calc:0},
        lit:{value:80, min:0, max:100, step:1, type:"range", class:"slider-lit", calc:0},

      }

    return bg;

  }



function calc_bg( bg ) {
  //dummy function
  return bg
}

function draw_bg( bg, ctx ) {



  var hue = parseFloat(bg.hue.value,10);
  var sat = parseFloat(bg.sat.value,10);
  var lit = parseFloat(bg.lit.value,10);

  ctx.rect(0,0,w,h);

  ctx.fillStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%)';

  ctx.fill();

  return bg;

}








  