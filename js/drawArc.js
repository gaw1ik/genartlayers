
function drawArc(x, y, radX, radY, rotation, startAngle, endAngle, lineWidth, hue, sat, lit, alpha, fillMode) {

    // console.log("ctxIndex",ctxIndex);

    //var thisCtx = ctx[ctxIndex];

    var x = x*w;
    var y = y*h;
    var radX = radX * h;
    var radY = radY * h;

    var alpha = alpha/255;

    // //console.log("x",x);
    // //console.log("y",y);
    // //console.log("rad",rad);

    ctxToDrawToNow.beginPath();

    // //console.log("ctx",ctx)

    ctxToDrawToNow.ellipse(x,y,radX,radY,rotation,startAngle,endAngle);

    // //console.log("hsla",hue,sat,lit,alpha/255);

    if(fillMode==0) {
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();
    } else {
        ctxToDrawToNow.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.lineWidth = lineWidth*h;
        ctxToDrawToNow.stroke()
    }
    
}

