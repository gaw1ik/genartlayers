
function drawCircle(x, y, rad, lineWidth, hue, sat, lit, alpha, fillMode) {

    // console.log("ctxIndex",ctxIndex);

    //var thisCtx = ctx[ctxIndex];

    var x = x*w;
    var y = y*h;
    var rad = rad * h;

    var alpha = alpha/255;

    // //console.log("x",x);
    // //console.log("y",y);
    // //console.log("rad",rad);

    ctxToDrawToNow.beginPath();

    // //console.log("ctx",ctx)

    ctxToDrawToNow.ellipse(x,y,rad,rad,0,0,twoPI);

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


// function drawCircle(x, y, rad, lineWidth, hue, sat, lit, alpha, fillMode) {

//     console.log("ctxIndex",ctxIndex);

//     var thisCtx = ctx[ctxIndex];

//     var x = x*w;
//     var y = y*h;
//     var rad = rad * h;

//     var alpha = alpha/255;

//     // //console.log("x",x);
//     // //console.log("y",y);
//     // //console.log("rad",rad);

//     thisCtx.beginPath();

//     // //console.log("ctx",ctx)

//     thisCtx.ellipse(x,y,rad,rad,0,0,twoPI);

//     // //console.log("hsla",hue,sat,lit,alpha/255);

//     if(fillMode==0) {
//         thisCtx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
//         thisCtx.fill();
//     } else {
//         thisCtx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
//         thisCtx.lineWidth = lineWidth*h;
//         thisCtx.stroke()
//     }
    
// }