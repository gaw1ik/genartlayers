
function drawEllipse(x, y, radX, radY, rotation, lineWidth, hue, sat, lit, alpha, fillMode) {

    // console.log("ctxIndex",ctxIndex);

    //var thisCtx = CTX[ctxIndex];

    var x = x*artboardH  + xCenterOffset;
    var y = y*artboardH;
    var radX = radX * artboardH;
    var radY = radY * artboardH;

    var alpha = alpha/255;

    // //console.log("x",x);
    // //console.log("y",y);
    // //console.log("rad",rad);

    ctxToDrawToNow.beginPath();

    // //console.log("ctx",ctx)

    ctxToDrawToNow.ellipse(x,y,radX,radY,rotation,0,twoPI);

    // //console.log("hsla",hue,sat,lit,alpha/255);

    if(fillMode==0) {
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();
    } else {
        ctxToDrawToNow.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.lineWidth = lineWidth*artboardH;
        ctxToDrawToNow.stroke()
    }
    
}

