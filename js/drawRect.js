// function drawRect(ctx, x, y, width, height, lineWidth=0.005, hue=0, sat=0, lit=0, alpha=255, fillMode=0) {

//     var x = x*w;
//     var y = y*h;
//     var width = width * w;
//     var height = height * h;

//     var alpha = alpha/255;

//     ctx.beginPath();

//     ctx.rect(x,y,width,height);

//     if(fillMode==0) {
//         ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
//         ctx.fill();
//     } else {
//         ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
//         ctx.lineWidth = lineWidth*h;
//         ctx.stroke()
//     }
    
// }


function drawRect(x, y, width, height, lineWidth=0.005, hue=0, sat=0, lit=0, alpha=255, fillMode=0) {

    //let layerIndex = layer.ctxIndex;

    // console.log("ctxIndex",ctxIndex);

    //var thisCtx = ctx[ctxIndex];
    

    var x = x*w;
    var y = y*h;
    var width = width * w;
    var height = height * h;

    var alpha = alpha/255;

    ctxToDrawToNow.beginPath();

    ctxToDrawToNow.rect(x,y,width,height);


    if(fillMode==0) {
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();
    } else {
        ctxToDrawToNow.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.lineWidth = lineWidth*h;
        ctxToDrawToNow.stroke()
    }

    
}

// function drawRect(x, y, width, height, lineWidth=0.005, hue=0, sat=0, lit=0, alpha=255, fillMode=0) {

//     //let layerIndex = layer.ctxIndex;

//     // console.log("ctxIndex",ctxIndex);

//     var thisCtx = ctx[ctxIndex];
    

//     var x = x*w;
//     var y = y*h;
//     var width = width * w;
//     var height = height * h;

//     var alpha = alpha/255;

//     thisCtx.beginPath();

//     thisCtx.rect(x,y,width,height);


//     if(fillMode==0) {
//         thisCtx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
//         thisCtx.fill();
//     } else {
//         thisCtx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
//         thisCtx.lineWidth = lineWidth*h;
//         thisCtx.stroke()
//     }

    
// }