function drawText(text, x, y, fontSize, hue, sat, lit) {

    ctxToDrawToNow.beginPath();

    var fontSizePix = fontSize*artboardH;

    ctxToDrawToNow.font = fontSizePix.toString() + "px serif";

    ctxToDrawToNow.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'; 

    ctxToDrawToNow.fillText(text, x*artboardW, y*artboardH);

    //ctx.endPath();

}



function drawTextPix(text, x, y, fontSizePix, hue, sat, lit) {

    ctxToDrawToNow.beginPath();

    ctxToDrawToNow.font = fontSizePix.toString() + "px serif";

    ctxToDrawToNow.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'; 

    ctxToDrawToNow.fillText(text, x*artboardW, y*artboardH);

    //ctx.endPath();

}