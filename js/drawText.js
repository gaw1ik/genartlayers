function drawText(text, x, y, fontSize, hue, sat, lit) {

    ctxToDrawToNow.beginPath();

    ctxToDrawToNow.font = fontSize.toString() + "px serif";

    ctxToDrawToNow.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'; 

    ctxToDrawToNow.fillText(text, x*w, y*h);

    //ctx.endPath();

}