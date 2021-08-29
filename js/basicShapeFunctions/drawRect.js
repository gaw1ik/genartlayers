function drawRect(x, y, width, height, lineWidth=0.005, hue=0, sat=0, lit=0, alpha=255, fillMode=0) {

    //let layerIndex = layer.ctxIndex;

    // console.log("ctxIndex",ctxIndex);

    //var thisCtx = CTX[ctxIndex];
    

    var x = (x+xCenterOffset  ) * artboardH;
    var y = (1-y-yCenterOffset) * artboardH;

    var width  = width  * artboardH;
    var height = height * artboardH;

    y = 1-y;

    var alpha = alpha/255;

    ctxToDrawToNow.beginPath();

    ctxToDrawToNow.rect(x,y,width,height);


    if(fillMode==0) {
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();
    } else {
        ctxToDrawToNow.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.lineWidth = lineWidth*artboardH;
        ctxToDrawToNow.stroke()
    }

    
}

function drawRectSimple(x=0.3, y=0.3, width=0.3, height=0.4) {

    var x = (x+xCenterOffset  ) * artboardH;
    var y = (1-y-yCenterOffset) * artboardH;

    var width  = width  * artboardH;
    var height = height * artboardH;

    var alpha = 1;

    ctxToDrawToNow.beginPath();

    ctxToDrawToNow.rect(x,y,width,height);

    ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
    ctxToDrawToNow.fill();


    
}





function drawCenterRect(x, y, w, h, lineWidth=0.005, hue=0, sat=0, lit=0, alpha=255, fillMode=0) {

    var x = (x + xCenterOffset) * artboardH;
    var y = (1-y-yCenterOffset) * artboardH;

    var width  = w * artboardH;
    var height = h * artboardH;

    var alpha = alpha/255;

    ctxToDrawToNow.beginPath();

    ctxToDrawToNow.rect(x-width/2, y-height/2, width, height);

    //console.log(x-width/2,y-height/2,width,height);


    if(fillMode==0) {
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();
    } else {
        ctxToDrawToNow.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.lineWidth = lineWidth*artboardH;
        ctxToDrawToNow.stroke()
    }

    
}